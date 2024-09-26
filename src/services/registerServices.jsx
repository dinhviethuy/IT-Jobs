import {post} from "../utils/request.jsx";

export const register = async (options) => {
  const result = await post("company", options);
  return result;
}