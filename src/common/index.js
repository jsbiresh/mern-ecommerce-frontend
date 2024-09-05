// const { default: SignUp } = require("../pages/SignUp");

const backendDomain = `http://localhost:8080`;

// const SummaryApi = {
//   SignUp: {
//     url: `${backendDomain}/api/signup`,
//     method: "post",
//   },
// };

const SignUp = {
  url: `${backendDomain}/api/signup`,
  method: "post",
};

const SignIn = {
  url: `${backendDomain}/api/signin`,
  method: "post",
};

const CurrentUser = {
  url: `${backendDomain}/api/user-details`,
  method: "get",
};

const LogOutUser = {
  url: `${backendDomain}/api/userLogout`,
  method: "get",
};

const SummaryApi = {
  SignUp,
  SignIn,
  CurrentUser,
  LogOutUser,
};

export default SummaryApi;
