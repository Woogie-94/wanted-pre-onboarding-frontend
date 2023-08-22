import { RouterProvider } from "react-router-dom";

import Toast from "./components/common/Toast";
import { ToastProvider } from "./contexts/toastContext";
import QueryClient from "./core/queryClient";
import router from "./routes/route";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <Toast />
    </ToastProvider>
  );
};

export default App;
