import {get} from "../utils/request.jsx";

export const checkLogin = async (email, password) => {
  const result = await get(`company?email=${email}&password=${password}`);
  return result;
}