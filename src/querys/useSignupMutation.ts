import useMuatation from "../hooks/useMutation";
import { sendSignup } from "../services/auth";

const useSignupMutation = () => {
  return useMuatation(sendSignup);
};

export default useSignupMutation;
