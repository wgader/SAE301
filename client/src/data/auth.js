import { postRequest, getRequest, deleteRequest } from "../lib/api-request.js";

const AuthData = {
  async login(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return await postRequest('auth', formData);
  },

  async signup(firstname, lastname, civ, email, password) {
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('civ', civ);
    formData.append('email', email);
    formData.append('password', password);
    return await postRequest('users', formData);
  },

  async getCurrentUser() {
    return await getRequest('auth');
  },

  async logout() {
    return await deleteRequest('auth');
  }
};

export { AuthData };
