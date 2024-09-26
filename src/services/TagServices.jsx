import {get} from "../utils/request.jsx";

export const getTags = async () => {
  const result = await get("tags");
  return result;
}