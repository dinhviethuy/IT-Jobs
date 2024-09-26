import {del, get, patch, post} from "../utils/request.jsx";

export const createCv= async (options) => {
  const result = await post(`cv`, options);
  return result;
}

export const getCvCompany = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
}

export const deleteCv = async (id) => {
  const result = await del(`cv`,id);
  return result;
}

export const getCv = async (id) => {
  const result = await get(`cv/${id}`);
  return result;
}

export const updateCv = async (id, options) => {
  const result = await patch(`cv/${id}`, options);
  return result;
}