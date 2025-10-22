import { postRequest, getRequest, deleteRequest, jsonPostRequest } from "../lib/api-request.js";

let AuthData = {};

AuthData.login = async function (userInfo) {
  const response = await postRequest('auth', JSON.stringify(userInfo));
  console.log("Login response:", response);
  return response;
}

AuthData.signup = async function (userInfo) {
  const response = await jsonPostRequest('users', JSON.stringify(userInfo));
  console.log("Signup response:", response);
  return response;
}

AuthData.getCurrentUser = async function () {
  return await getRequest('auth');
};

AuthData.logout = async function () {
  return await deleteRequest('auth');
};

export { AuthData };
