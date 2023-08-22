import { useState } from "react";

type MutateFunction<TData = unknown, TVariables = unknown> = (variables: TVariables) => Promise<TData>;
type MutateOptions<TData = unknown, TVariables = unknown> = {
  onSuccess?: (result: Awaited<TData>, payload: TVariables) => void;
  onError?: (error: unknown) => void;
};

function useMuatation<TData = unknown, TVariables = unknown>(
  mutationFn: MutateFunction<TData, TVariables>,
  options?: MutateOptions<TData>,
) {
  const [loading, setLoading] = useState(false);

  const mutate = async (data: TVariables, mutationOptions?: MutateOptions<TData>) => {
    try {
      setLoading(true);
      const result = await mutationFn(data);
      options?.onSuccess?.(result, data);
      mutationOptions?.onSuccess?.(result, data);
    } catch (error) {
      options?.onError?.(error);
      mutationOptions?.onError?.(error);
    }
    setLoading(false);
  };

  return { mutate, isLoading: loading };
}

export default useMuatation;
