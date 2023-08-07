import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";

interface HttpError {
  error: string;
  message: string;
  status: number;
}

const useError = () => {
  const [error, setError] = useState<HttpError>();

  const getError = (error: unknown) => {
    if (isAxiosError(error)) {
      const { response }: AxiosError<HttpError> = error;
      if (response?.data) {
        setError(response.data);
      }
    }
  };

  return {
    httpError: error,
    getHttpError: getError,
  };
};

export default useError;
