import useSend from "../hook/useSend";
import { sendSignup } from "../services/auth";

const useSignupSend = () => {
  return useSend(sendSignup);
};

export default useSignupSend;
