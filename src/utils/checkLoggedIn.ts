const checkLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");

  return !!accessToken;
};

export default checkLoggedIn;
