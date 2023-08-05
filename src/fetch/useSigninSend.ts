import useSend from "../hook/useSend";
import { sendSignin } from "../services/auth";

const useSigninSend = () => {
  return useSend(sendSignin);
};

export default useSigninSend;
