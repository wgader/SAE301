import { getRequest } from "../lib/api-request.js";

let UserData = {};

UserData.fetchAll = async function(){
  const data = await getRequest('users');
  return data === false ? [] : data;
};

UserData.fetch = async function(id){
  const data = await getRequest('users/'+id);
  return data === false ? null : data;
};

export { UserData };
