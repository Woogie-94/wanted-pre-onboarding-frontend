import { createBrowserRouter } from "react-router-dom";

import { PATH_ROOT, PATH_SIGNIN, PATH_SIGNUP, PATH_TODO } from "../constants/Path";
import Main from "../page/Main";
import Signin from "../page/Signin";
import Signup from "../page/Signup";
import Todo from "../page/Todo";

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
