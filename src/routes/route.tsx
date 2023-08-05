import { createBrowserRouter } from "react-router-dom";

import Main from "../page/Main";
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
    element: <>signin</>,
  },
  {
    path: "/todo",
    element: <>todo</>,
  },
]);

export default router;
