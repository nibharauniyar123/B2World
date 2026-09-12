
import { useEffect, useMemo, useState } from "react";
import axios from "../utils/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CSVLink } from "react-csv";

import QRCode from "react-qr-code";
import "./Visitors.css";


function Visitors() {

  // =====================================================
  // STATE
  // =====================================================

  const [visitors, setVisitors] = useState([]);

  const [users, setUsers] = useState([]);

  const [societies, setSocieties] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [dateFilter, setDateFilter] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [showQR, setShowQR] =
    useState(null);


  const perPage = 5;  


  // =====================================================
  // FORM
  // =====================================================

  const emptyForm = {

    name: "",

    phone: "",

    purpose: "",

    residentId: "",

    societyId: "",

    visitorType: "",

    visitDate: "",

    expectedTime: "",

    vehicleType: "",

    vehicleNumber: "",

    deliveryType: "",

    deliveryCompany: "",

  };


  const [form, setForm] =
    useState(emptyForm);


  // =====================================================
  // FETCH VISITORS
  // =====================================================

  const fetchVisitors = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          "/api/visitors"
        );

      setVisitors(
        response.data
      );

    } catch (error) {

      console.error(
        "FETCH VISITORS ERROR:",
        error
      );

      toast.error(
        "Failed to load visitors"
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {

    try {

      const response =
        await axios.get(
          "/api/users"
        );


      const data =
        response.data?.users ||
        response.data ||
        [];


      setUsers(data);

    } catch (error) {

      console.error(
        "FETCH USERS ERROR:",
        error
      );

    }
  };


  // =====================================================
  // FETCH SOCIETIES
  // =====================================================

  const fetchSocieties = async () => {

    try {

      const response =
        await axios.get(
          "/api/societies"
        );


      const data =
        response.data?.societies ||
        response.data ||
        [];


      setSocieties(data);

    } catch (error) {

      console.error(
        "FETCH SOCIETIES ERROR:",
        error
      );

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchVisitors();

    fetchUsers();

    fetchSocieties();

  }, []);


  // =====================================================
  // CREATE VISITOR
  // =====================================================

  const handleCreate = async (e) => {

    e.preventDefault();


    try {

      const response =
        await axios.post(
          "/api/visitors",
          form
        );


      toast.success(
        response.data?.message ||
        "Visitor added successfully"
      );


      setForm(
        emptyForm
      );


      await fetchVisitors();


    } catch (error) {

      console.error(
        "CREATE VISITOR ERROR:",
        error.response?.data ||
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Visitor create failed"
      );

    }

  };


  // =====================================================
  // APPROVE
  // =====================================================

  const handleApprove = async (id) => {

    try {

      const response =
        await axios.put(
          `/api/visitors/${id}/status`,
          {
            status:
              "APPROVED",
          }
        );


      toast.success(
        response.data.message
      );


      await fetchVisitors();


    } catch (error) {

      console.error(
        "APPROVE ERROR:",
        error.response?.data ||
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Approval failed"
      );

    }

  };


  // =====================================================
  // REJECT
  // =====================================================

  const handleReject = async (id) => {

    try {

      const response =
        await axios.put(
          `/api/visitors/${id}/status`,
          {
            status:
              "REJECTED",
          }
        );


      toast.success(
        response.data.message
      );


      await fetchVisitors();


    } catch (error) {

      console.error(
        "REJECT ERROR:",
        error.response?.data ||
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Rejection failed"
      );

    }

  };


  // =====================================================
  // CHECK IN
  // =====================================================

  const handleCheckIn = async (id) => {

    try {

      const response =
        await axios.put(
          `/api/visitors/${id}/check-in`
        );


      toast.success(
        response.data.message
      );


      await fetchVisitors();


    } catch (error) {

      console.error(
        "CHECK IN ERROR:",
        error.response?.data ||
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Check-in failed"
      );

    }

  };


  // =====================================================
  // CHECK OUT
  // =====================================================

  const handleCheckOut = async (id) => {

    try {

      const response =
        await axios.put(
          `/api/visitors/${id}/check-out`
        );


      toast.success(
        response.data.message
      );


      await fetchVisitors();


    } catch (error) {

      console.error(
        "CHECK OUT ERROR:",
        error.response?.data ||
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Check-out failed"
      );

    }

  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this visitor?"
      );


    if (!confirmed) return;


    try {

      await axios.delete(
        `/api/visitors/${id}`
      );


      toast.success(
        "Visitor deleted successfully"
      );


      await fetchVisitors();


    } catch (error) {

      console.error(
        "DELETE ERROR:",
        error
      );


      toast.error(
        "Failed to delete visitor"
      );

    }

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredVisitors =
    useMemo(() => {

      return visitors.filter(
        (visitor) => {

          const text =
            search.toLowerCase();


          const matchesSearch =

            visitor.name
              ?.toLowerCase()
              .includes(text)

            ||

            visitor.phone
              ?.toLowerCase()
              .includes(text)

            ||

            visitor.qrCode
              ?.toLowerCase()
              .includes(text);


          const matchesStatus =

            statusFilter === "ALL"

            ||

            visitor.status ===
              statusFilter;


          const matchesDate =

            !dateFilter

            ||

            new Date(
              visitor.createdAt
            )
              .toISOString()
              .slice(0, 10)

              ===

              dateFilter;


          return (
            matchesSearch &&
            matchesStatus &&
            matchesDate
          );

        }
      );

    }, [
      visitors,
      search,
      statusFilter,
      dateFilter,
    ]);


  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages =
    Math.ceil(
      filteredVisitors.length /
      perPage
    );


  const firstIndex =
    (currentPage - 1) *
    perPage;


  const currentVisitors =
    filteredVisitors.slice(
      firstIndex,
      firstIndex + perPage
    );


  // =====================================================
  // CSV
  // =====================================================

  const csvHeaders = [

    {
      label: "Visitor Name",
      key: "name",
    },

    {
      label: "Phone",
      key: "phone",
    },

    {
      label: "Purpose",
      key: "purpose",
    },

    {
      label: "Visitor Type",
      key: "visitorType",
    },

    {
      label: "Vehicle",
      key: "vehicleNumber",
    },

    {
      label: "Delivery",
      key: "deliveryType",
    },

    {
      label: "QR Code",
      key: "qrCode",
    },

    {
      label: "Status",
      key: "status",
    },

    {
      label: "Created",
      key: "createdAt",
    },

  ];


  // =====================================================
  // USER NAME
  // =====================================================

  const getUserName = (id) => {

    const user =
      users.find(
        (item) =>
          Number(item.id) ===
          Number(id)
      );


    return (
      user?.name ||
      "-"
    );
  };


  // =====================================================
  // SOCIETY NAME
  // =====================================================

  const getSocietyName = (id) => {

    const society =
      societies.find(
        (item) =>
          Number(item.id) ===
          Number(id)
      );


    return (
      society?.name ||
      "-"
    );
  };


  // =====================================================
  // STATUS BADGE
  // =====================================================

  const statusClass = (status) => {

    switch (status) {

      case "APPROVED":
        return "status approved";

      case "REJECTED":
        return "status rejected";

      case "CHECKED_IN":
        return "status checkedIn";

      case "CHECKED_OUT":
        return "status checkedOut";

      default:
        return "status pending";

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="visitor-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="visitor-header">

        <div>

          <h1>
            Visitors Management
          </h1>

          <p>
            Manage, approve and track
            society visitors
          </p>

        </div>

        <div className="admin-badge">
          ADMIN
        </div>

      </div>



      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="stats-grid">

        <div className="stat-card">

          <span>
            Total Visitors
          </span>

          <strong>
            {visitors.length}
          </strong>

        </div>


        <div className="stat-card">

          <span>
            Pending
          </span>

          <strong>
            {
              visitors.filter(
                (v) =>
                  v.status ===
                  "PENDING"
              ).length
            }
          </strong>

        </div>


        <div className="stat-card">

          <span>
            Checked In
          </span>

          <strong>
            {
              visitors.filter(
                (v) =>
                  v.status ===
                  "CHECKED_IN"
              ).length
            }
          </strong>

        </div>


        <div className="stat-card">

          <span>
            Completed
          </span>

          <strong>
            {
              visitors.filter(
                (v) =>
                  v.status ===
                  "CHECKED_OUT"
              ).length
            }
          </strong>

        </div>

      </div>



      {/* =================================================
          CREATE FORM
      ================================================= */}

      <div className="card">

        <div className="section-title">

          <h2>
            Register New Visitor
          </h2>

          <p>
            Add visitor details and
            generate visitor QR
          </p>

        </div>


        <form
          onSubmit={handleCreate}
          className="visitor-form"
        >


          {/* VISITOR NAME */}

          <div className="field">

            <label>
              Visitor Name *
            </label>

            <input
              type="text"
              placeholder="Enter visitor name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              }
              required
            />

          </div>


          {/* PHONE */}

          <div className="field">

            <label>
              Phone *
            </label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone:
                    e.target.value,
                })
              }
              required
            />

          </div>


          {/* VISITOR TYPE */}

          <div className="field">

            <label>
              Visitor Type
            </label>

            <select
              value={form.visitorType}
              onChange={(e) =>
                setForm({
                  ...form,
                  visitorType:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Type
              </option>

              <option value="GUEST">
                Guest
              </option>

              <option value="FAMILY">
                Family
              </option>

              <option value="SERVICE">
                Service Provider
              </option>

              <option value="DELIVERY">
                Delivery
              </option>

              <option value="VENDOR">
                Vendor
              </option>

            </select>

          </div>


          {/* PURPOSE */}

          <div className="field">

            <label>
              Purpose
            </label>

            <input
              type="text"
              placeholder="Purpose of visit"
              value={form.purpose}
              onChange={(e) =>
                setForm({
                  ...form,
                  purpose:
                    e.target.value,
                })
              }
            />

          </div>


          {/* RESIDENT */}

          <div className="field">

            <label>
              Resident
            </label>

            <select
              value={form.residentId}
              onChange={(e) =>
                setForm({
                  ...form,
                  residentId:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Resident
              </option>


              {users.map((user) => (

                <option
                  key={user.id}
                  value={user.id}
                >

                  {user.name}
                  {" - "}
                  {user.email}

                </option>

              ))}

            </select>

          </div>


          {/* SOCIETY */}

          <div className="field">

            <label>
              Society
            </label>

            <select
              value={form.societyId}
              onChange={(e) =>
                setForm({
                  ...form,
                  societyId:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Society
              </option>


              {societies.map(
                (society) => (

                  <option
                    key={society.id}
                    value={society.id}
                  >

                    {society.name}

                  </option>

                )
              )}

            </select>

          </div>


          {/* VISIT DATE */}

          <div className="field">

            <label>
              Visit Date
            </label>

            <input
              type="date"
              value={form.visitDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  visitDate:
                    e.target.value,
                })
              }
            />

          </div>


          {/* EXPECTED TIME */}

          <div className="field">

            <label>
              Expected Time
            </label>

            <input
              type="time"
              value={form.expectedTime}
              onChange={(e) =>
                setForm({
                  ...form,
                  expectedTime:
                    e.target.value,
                })
              }
            />

          </div>


          {/* VEHICLE TYPE */}

          <div className="field">

            <label>
              Vehicle Type
            </label>

            <select
              value={form.vehicleType}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicleType:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Vehicle
              </option>

              <option value="NONE">
                No Vehicle
              </option>

              <option value="BIKE">
                Bike
              </option>

              <option value="CAR">
                Car
              </option>

              <option value="VAN">
                Van
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </div>


          {/* VEHICLE NUMBER */}

          <div className="field">

            <label>
              Vehicle Number
            </label>

            <input
              type="text"
              placeholder="e.g. BA 12 PA 1234"
              value={form.vehicleNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicleNumber:
                    e.target.value,
                })
              }
            />

          </div>


          {/* DELIVERY TYPE */}

          <div className="field">

            <label>
              Delivery Type
            </label>

            <select
              value={form.deliveryType}
              onChange={(e) =>
                setForm({
                  ...form,
                  deliveryType:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Delivery
              </option>

              <option value="FOOD">
                Food
              </option>

              <option value="PARCEL">
                Parcel
              </option>

              <option value="COURIER">
                Courier
              </option>

              <option value="GROCERY">
                Grocery
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </div>


          {/* DELIVERY COMPANY */}

          <div className="field">

            <label>
              Delivery Company
            </label>

            <input
              type="text"
              placeholder="Company name"
              value={form.deliveryCompany}
              onChange={(e) =>
                setForm({
                  ...form,
                  deliveryCompany:
                    e.target.value,
                })
              }
            />

          </div>


          {/* BUTTON */}

          <div className="form-actions">

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >

              {loading
                ? "Saving..."
                : "Add Visitor"}

            </button>

          </div>

        </form>

      </div>



      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="card filter-card">

        <div className="filters">

          <input
            type="text"
            placeholder="Search by name, phone or QR..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(1);

            }}
          />


          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {

              setDateFilter(
                e.target.value
              );

              setCurrentPage(1);

            }}
          />


          <select
            value={statusFilter}
            onChange={(e) => {

              setStatusFilter(
                e.target.value
              );

              setCurrentPage(1);

            }}
          >

            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="APPROVED">
              Approved
            </option>

            <option value="REJECTED">
              Rejected
            </option>

            <option value="CHECKED_IN">
              Checked In
            </option>

            <option value="CHECKED_OUT">
              Checked Out
            </option>

          </select>

        </div>

      </div>



      {/* =================================================
          VISITOR TABLE
      ================================================= */}

      <div className="card">

        <div className="table-header">

          <div>

            <h2>
              Visitor History
            </h2>

            <p>
              {filteredVisitors.length}
              {" "}
              visitor(s) found
            </p>

          </div>


          <CSVLink
            data={filteredVisitors}
            headers={csvHeaders}
            filename="Visitors.csv"
            className="export-btn"
          >

            Export CSV

          </CSVLink>

        </div>


        {loading ? (

          <div className="loading">
            Loading visitors...
          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Visitor
                  </th>

                  <th>
                    Resident
                  </th>

                  <th>
                    Society
                  </th>

                  <th>
                    Purpose
                  </th>

                  <th>
                    Vehicle
                  </th>

                  <th>
                    QR
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Visit
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {currentVisitors.length === 0 ? (

                  <tr>

                    <td
                      colSpan="9"
                      className="empty"
                    >

                      No visitors found.

                    </td>

                  </tr>

                ) : (

                  currentVisitors.map(
                    (visitor) => (

                      <tr
                        key={
                          visitor.id
                        }
                      >


                        {/* VISITOR */}

                        <td>

                          <strong>
                            {visitor.name}
                          </strong>

                          <small>
                            {visitor.phone}
                          </small>

                        </td>


                        {/* RESIDENT */}

                        <td>

                          {getUserName(
                            visitor.residentId
                          )}

                        </td>


                        {/* SOCIETY */}

                        <td>

                          {getSocietyName(
                            visitor.societyId
                          )}

                        </td>


                        {/* PURPOSE */}

                        <td>

                          <strong>
                            {visitor.visitorType ||
                              "-"}
                          </strong>

                          <small>
                            {visitor.purpose ||
                              "-"}
                          </small>

                        </td>


                        {/* VEHICLE */}

                        <td>

                          {visitor.vehicleNumber ||
                            "-"}

                        </td>


                        {/* QR */}

                        <td>

                          {visitor.qrCode ? (

                            <button
                              className="qr-btn"
                              onClick={() =>
                                setShowQR(
                                  visitor
                                )
                              }
                            >

                              View QR

                            </button>

                          ) : (
                            "-"
                          )}

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              statusClass(
                                visitor.status
                              )
                            }
                          >

                            {visitor.status}

                          </span>

                        </td>


                        {/* DATE */}

                        <td>

                          <small>

                            {visitor.visitDate
                              ? new Date(
                                  visitor.visitDate
                                ).toLocaleDateString()
                              : new Date(
                                  visitor.createdAt
                                ).toLocaleDateString()}

                          </small>


                          {visitor.expectedTime && (

                            <small>

                              {visitor.expectedTime}

                            </small>

                          )}

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="actions">


                            {visitor.status ===
                              "PENDING" && (

                              <>

                                <button
                                  className="approve-btn"
                                  onClick={() =>
                                    handleApprove(
                                      visitor.id
                                    )
                                  }
                                >

                                  Approve

                                </button>


                                <button
                                  className="reject-btn"
                                  onClick={() =>
                                    handleReject(
                                      visitor.id
                                    )
                                  }
                                >

                                  Reject

                                </button>

                              </>

                            )}


                            {visitor.status ===
                              "APPROVED" && (

                              <button
                                className="check-btn"
                                onClick={() =>
                                  handleCheckIn(
                                    visitor.id
                                  )
                                }
                              >

                                Check In

                              </button>

                            )}


                            {visitor.status ===
                              "CHECKED_IN" && (

                              <button
                                className="checkout-btn"
                                onClick={() =>
                                  handleCheckOut(
                                    visitor.id
                                  )
                                }
                              >

                                Check Out

                              </button>

                            )}


                            {visitor.status ===
                              "CHECKED_OUT" && (

                              <span className="completed">

                                Completed

                              </span>

                            )}


                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  visitor.id
                                )
                              }
                            >

                              Delete

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        )}


        {/* PAGINATION */}

        <div className="pagination">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >

            Previous

          </button>


          <span>

            Page {currentPage}
            {" "}
            of{" "}
            {Math.max(
              totalPages,
              1
            )}

          </span>


          <button
            disabled={
              currentPage >=
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >

            Next

          </button>

        </div>

      </div>



      {/* =================================================
          QR MODAL
      ================================================= */}

      {showQR && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowQR(null)
          }
        >

          <div
            className="qr-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-btn"
              onClick={() =>
                setShowQR(null)
              }
            >
              ×
            </button>


            <h2>
              Visitor QR Code
            </h2>


            <p>
              {showQR.name}
            </p>


            <div className="qr-box">

              <QRCode
                value={
                  showQR.qrToken ||
                  showQR.qrCode
                }
                size={180}
              />

            </div>


            <strong>
              {showQR.qrCode}
            </strong>


            <p className="qr-token">

              Token:
              {" "}
              {showQR.qrToken}

            </p>

          </div>

        </div>

      )}


      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </div>

  );

}


export default Visitors;

