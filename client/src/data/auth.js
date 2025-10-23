import { postRequest, getRequest, deleteRequest, jsonPostRequest, patchRequest } from "../lib/api-request.js";

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

/**
 * Met à jour les informations du profil
 */
AuthData.updateProfile = async function(profileData) {
  const response = await patchRequest('auth', profileData);
  console.log("Update profile response:", response);
  return response;
};

/**
 * Change le mot de passe
 */
AuthData.changePassword = async function(currentPassword, newPassword) {
  const response = await patchRequest('auth/password', {
    current_password: currentPassword,
    new_password: newPassword
  });
  console.log("Change password response:", response);
  return response;
};

/**
 * Supprime le compte de l'utilisateur connecté
 */
AuthData.deleteAccount = async function() {
  // Récupérer d'abord l'utilisateur connecté pour avoir son ID
  const currentUser = await AuthData.getCurrentUser();
  if (!currentUser || !currentUser.authenticated || !currentUser.user) {
    return { success: false, error: 'Utilisateur non connecté' };
  }
  
  const userId = currentUser.user.id;
  const response = await deleteRequest(`users/${userId}`);
  console.log("Delete account response:", response);
  
  // Déconnecter l'utilisateur après suppression
  if (response) {
    await AuthData.logout();
  }
  
  return response;
};

export { AuthData };
