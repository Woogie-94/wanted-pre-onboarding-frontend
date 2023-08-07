import { RouterProvider } from "react-router-dom";

import FetchClient from "./core/fetchClient";
import router from "./routes/route";

export const fetchClient = new FetchClient();

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
