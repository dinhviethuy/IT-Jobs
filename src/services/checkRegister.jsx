import {get} from "../utils/request.jsx";

export const checkRegister = async (key, value) => {
  const result = await get(`company?${key}=${value}`);
  return result;
}