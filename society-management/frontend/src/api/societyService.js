import API from "./api";

export const getSocieties = async () => {
  const res = await API.get("/societies");
  return res.data;
};

export const createSociety = async (data) => {
  const res = await API.post("/societies", data);
  return res.data;
};

export const deleteSociety = async (id) => {
  const res = await API.delete(`/societies/${id}`);
  return res.data;
};