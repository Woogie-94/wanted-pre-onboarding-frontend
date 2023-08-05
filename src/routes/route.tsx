import { createBrowserRouter } from "react-router-dom";

import Main from "../page/Main";
import Signin from "../page/Signin";
import Signup from "../page/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/todo",
    element: <>todo</>,
  },
]);

export default router;
