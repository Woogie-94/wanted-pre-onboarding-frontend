import useMutation from "../hooks/useMutation";
import { sendSignin } from "../services/auth";

const useSigninMutation = () => {
  return useMutation(sendSignin);
};

export default useSigninMutation;
