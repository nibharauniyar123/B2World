import API from "../api/axios";

export const getFlats = () => API.get("/flats");

export const createFlat = (data) => API.post("/flats", data);

export const deleteFlat = (id) => API.delete(`/flats/${id}`);