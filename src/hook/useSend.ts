import { useState } from "react";

type SendFunction<TData = unknown, TVariables = unknown> = (variables: TVariables) => Promise<TData>;
type SendOptions<TData = unknown, TVariables = unknown> = {
  onSuccess?: (result: Awaited<TData>, payload: TVariables) => void;
  onError?: (error: unknown) => void;
};

function useSend<TData = unknown, TVariables = unknown>(
  sendFn: SendFunction<TData, TVariables>,
  options?: SendOptions<TData>,
) {
  const [loading, setLoading] = useState(false);

  const send = async (data: TVariables, sendOptions?: SendOptions<TData>) => {
    try {
      setLoading(true);
      const result = await sendFn(data);
      options?.onSuccess?.(result, data);
      sendOptions?.onSuccess?.(result, data);
    } catch (error) {
      options?.onError?.(error);
      sendOptions?.onError?.(error);
    }
    setLoading(false);
  };

  return { send, isLoading: loading };
}

export default useSend;
