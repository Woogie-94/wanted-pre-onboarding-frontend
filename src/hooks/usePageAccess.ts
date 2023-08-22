import { useEffect } from "react";
import { useMatches, useNavigate } from "react-router-dom";

import { PATH_SIGNIN, PATH_TODO, PRIVATE_PAGE_PATH, PUBLIC_PAGE_PATH } from "../constants/Path";
import checkLoggedIn from "../utils/checkLoggedIn";

const usePageAccess = () => {
  const navigate = useNavigate();
  const match = useMatches();
  const isLoggedIn = checkLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      const isPublicPage = PUBLIC_PAGE_PATH.some(path => path === match[0].pathname);

      if (isPublicPage) {
        navigate(PATH_TODO);
      }
    } else {
      const isPrivatePage = PRIVATE_PAGE_PATH.some(path => path === match[0].pathname);

      if (isPrivatePage) {
        navigate(PATH_SIGNIN);
      }
    }
  }, [navigate, match, isLoggedIn]);
};

export default usePageAccess;
