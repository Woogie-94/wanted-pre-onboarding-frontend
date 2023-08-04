import { createBrowserRouter } from "react-router-dom";

import Main from "../page/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <>signup</>,
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
