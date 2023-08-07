import { useEffect, useSyncExternalStore } from "react";

import { fetchClient } from "../App";

type FetchKey = string | readonly unknown[];
type FetchFN<TData = unknown> = () => TData | Promise<TData>;

const useFetch = <TData = unknown>(key: FetchKey, fetchFn: FetchFN<TData>) => {
  const store = useSyncExternalStore(
    onStoreChange => fetchClient.subscribe(onStoreChange),
    () => fetchClient.getFetchData<TData>(key),
  );

  useEffect(() => {
    fetchClient.fetch(key, fetchFn);
  }, [key, fetchFn]);

  return { data: store?.data, error: store?.error };
};

export default useFetch;
