import { useCallback } from "react";

import { useToastDispatchContext } from "../contexts/toastContext";
import { sleep } from "../utils";

const DEFAILT_DURATION = 2000;

const useToast = () => {
  const dispatch = useToastDispatchContext();

  const close = useCallback(
    async (duration: number) => {
      dispatch({ type: "dismiss" });
      await sleep(duration);
      dispatch({ type: "remove" });
    },
    [dispatch],
  );

  const show = useCallback(
    ({ message, duration = DEFAILT_DURATION }: { message: string; duration?: number }) => {
      dispatch({ type: "add", message });

      return close(duration);
    },
    [close, dispatch],
  );

  return { show };
};

export default useToast;
