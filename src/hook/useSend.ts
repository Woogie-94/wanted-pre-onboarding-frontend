import { useState } from "react";

type SendFunction<TData = unknown, TVariables = unknown> = (variables: TVariables) => Promise<TData>;
type SendOptions<TData = unknown> = {
  onSuccess?: (data: Awaited<TData>) => void;
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
      options?.onSuccess?.(result);
      sendOptions?.onSuccess?.(result);
    } catch (error) {
      options?.onError?.(error);
      sendOptions?.onError?.(error);
    }
    setLoading(false);
  };

  return { send, isLoading: loading };
}

export default useSend;
