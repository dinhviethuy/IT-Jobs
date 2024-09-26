import {del, get, patch, post} from "../utils/request.jsx";

export const getAllJob = async () => {
  const result = await get("jobs");
  return result;
}

export const getJob = async (id) => {
  const result = await get(`jobs/${id}`);
  return result;
}

export const getJobCompany = async (id) => {
  const result = await get(`jobs?idCompany=${id}`);
  return result;
}

export const deleteJob = async (id) => {
  const result = await del(`jobs`,id);
  return result;
}

export const updateJob = async (id, options) => {
  const result = await patch(`jobs/${id}`, options);
  return result;
}

export const createJob = async (options) => {
  const result = await post(`jobs`, options);
  return result;
}