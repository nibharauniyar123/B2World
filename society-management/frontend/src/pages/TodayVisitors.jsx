import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const [visitors, setVisitors] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchVisitors();
}, []);

const fetchVisitors = async () => {
  setLoading(true);

  try {
    const res = await axios.get("/api/visitors");
    setVisitors(res.data);
  } catch (error) {
    console.log(error);
    toast.error("Failed to load visitors");
  } finally {
    setLoading(false);
  }
};
const today = new Date().toDateString();

const todayVisitors = visitors.filter((visitor) => {
  return (
    new Date(visitor.createdAt).toDateString() === today
  );
});
const handleCheckIn = async (id) => {
  try {
    await axios.put(`/api/visitors/${id}/checkin`);

    toast.success("Visitor Checked In");

    fetchVisitors();
  } catch (error) {
    console.log(error);
    toast.error("Check In Failed");
  }
};
const handleCheckOut = async (id) => {

  const confirm = window.confirm(
    "Are you sure you want to check out this visitor?"
  );

  if (!confirm) return;

  try {
    await axios.put(`/api/visitors/${id}/checkout`);

    toast.success("Visitor Checked Out");

    fetchVisitors();
  } catch (error) {
    console.log(error);
    toast.error("Check Out Failed");
  }
};

