import { useEffect, useSyncExternalStore } from "react";

import { queryClient } from "../App";

type queryhKey = string | readonly unknown[];
type queryhFN<TData = unknown> = () => TData | Promise<TData>;

const useQuery = <TData = unknown>(key: queryhKey, queryFn: queryhFN<TData>) => {
  const store = useSyncExternalStore(
    onStoreChange => queryClient.subscribe(onStoreChange),
    () => queryClient.getQueryData<TData>(key),
  );

  useEffect(() => {
    queryClient.fetch(key, queryFn);
  }, [key, queryFn]);

  return { data: store?.data, error: store?.error };
};

export default useQuery;
