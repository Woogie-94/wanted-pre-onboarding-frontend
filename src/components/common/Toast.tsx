import { useToastContext } from "../../contexts/toastContext";

const Toast = () => {
  const toast = useToastContext();
  const isShow = toast && !(toast.type === "remove");

  return <>{isShow && <p>{toast.message}</p>}</>;
};

export default Toast;
