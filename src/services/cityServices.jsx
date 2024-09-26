import {get} from "../utils/request.jsx";

export const getCity = async () => {
  const result = await get("city");
  return result;
}