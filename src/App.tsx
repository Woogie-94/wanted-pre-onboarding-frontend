import { RouterProvider } from "react-router-dom";

import QueryClient from "./core/queryClient";
import router from "./routes/route";

export const queryClient = new QueryClient();

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
