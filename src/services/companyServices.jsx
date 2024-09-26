import {get, patch} from "../utils/request.jsx";

export const getCompanys = async () => {
  const result = await get("company");
  return result;
}

export const getCompany = async (id) => {
  const result = await get(`company/${id}`);
  return result;
}

export const getAllJobCompany = async (id) => {
  const result = await get(`jobs?idCompany=${id}`);
  return result;
}

export const getCvCompany = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
}

export const updateCompany = async (id, options) => {
  const result = await patch(`company/${id}`, options);
  return result;
}
