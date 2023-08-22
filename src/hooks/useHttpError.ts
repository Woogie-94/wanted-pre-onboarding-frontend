import { AxiosError, isAxiosError } from "axios";

import useToast from "./useToast";

interface HttpError {
  error: string;
  message: string;
  status: number;
}

const useHttpError = () => {
  const { show } = useToast();

  const showErrorToast = (error: unknown) => {
    if (isAxiosError(error)) {
      const { response }: AxiosError<HttpError> = error;
      if (response?.data) {
        show({ message: response.data.message });
      }
    }
  };

  return {
    showErrorToast,
  };
};

export default useHttpError;
