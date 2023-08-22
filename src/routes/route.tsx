import { createBrowserRouter } from "react-router-dom";

import { PATH_ROOT, PATH_SIGNIN, PATH_SIGNUP, PATH_TODO } from "../constants/Path";
import Main from "../pages/Main";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Todo from "../pages/Todo";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <Main />,
  },
  {
    path: PATH_SIGNUP,
    element: <Signup />,
  },
  {
    path: PATH_SIGNIN,
    element: <Signin />,
  },
  {
    path: PATH_TODO,
    element: <Todo />,
  },
]);

export default router;
