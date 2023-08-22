import useMutation from "../hook/useMutation";
import { sendSignin } from "../services/auth";

const useSigninMutation = () => {
  return useMutation(sendSignin);
};

export default useSigninMutation;
