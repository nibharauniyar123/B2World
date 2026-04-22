import axios from "axios";

const API = "http://localhost:5000/api/complaints";

export const getAllComplaints = (token) => {
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStatus = (id, status, token) => {
  return axios.patch(
    `${API}/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};