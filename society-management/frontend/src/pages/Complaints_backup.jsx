import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function Complaints() {
  // =========================================================
  // STATES
  // =========================================================

  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [viewMode, setViewMode] = useState("all");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [editingId, setEditingId] = useState(null);

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: "",
    societyId: "",
    vendorId: "",
    assignedTo: "",
    feedback: "",
    rating: "",
  });

  // =========================================================
  // GET LOGGED IN USER
  // =========================================================

  const getLoggedInUser = () => {
    const possibleKeys = [
      "user",
      "userInfo",
      "loggedUser",
      "currentUser",
    ];

    for (const key of possibleKeys) {
      try {
        const value = localStorage.getItem(key);

        if (!value) continue;

        const parsed = JSON.parse(value);

        if (parsed?.id) {
          return parsed;
        }

        if (parsed?.user?.id) {
          return parsed.user;
        }
      } catch (error) {
        console.log(
          `Could not read localStorage key: ${key}`
        );
      }
    }

    return null;
  };

  const loggedUser = getLoggedInUser();

  const loggedUserId = loggedUser?.id;

  const loggedUserRole =
    loggedUser?.role?.toUpperCase() || "";

  console.log("LOGGED USER:", loggedUser);
  console.log("LOGGED USER ID:", loggedUserId);
  console.log("LOGGED USER ROLE:", loggedUserRole);

  // =========================================================
  // FETCH ALL DATA
  // =========================================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        complaintRes,
        userRes,
        societyRes,
        vendorRes,
      ] = await Promise.all([
        axios.get(`${API}/complaints`),
        axios.get(`${API}/users`),
        axios.get(`${API}/societies`),
        axios.get(`${API}/vendors`),
      ]);

      const complaintData =
        Array.isArray(complaintRes.data)
          ? complaintRes.data
          : complaintRes.data?.complaints || [];

      const userData =
        Array.isArray(userRes.data)
          ? userRes.data
          : userRes.data?.users || [];

      const societyData =
        Array.isArray(societyRes.data)
          ? societyRes.data
          : societyRes.data?.societies || [];

      const vendorData =
        Array.isArray(vendorRes.data)
          ? vendorRes.data
          : vendorRes.data?.vendors || [];

      setComplaints(complaintData);
      setUsers(userData);
      setSocieties(societyData);
      setVendors(vendorData);

      console.log(
        "Complaints:",
        complaintData
      );

      console.log(
        "Users:",
        userData
      );

      console.log(
        "Societies:",
        societyData
      );

      console.log(
        "Vendors:",
        vendorData
      );
    } catch (error) {
      console.error(
        "FETCH DATA ERROR:",
        error
      );

      alert(
        "Failed to fetch complaint data."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH MY COMPLAINTS
  // =========================================================

  const fetchMyComplaints = async () => {
    try {
      if (!loggedUserId) {
        alert(
          "Logged-in user ID not found. Please login again."
        );

        console.error(
          "No logged-in user ID found."
        );

        return;
      }

      setLoading(true);

      console.log(
        "Fetching My Complaints for:",
        loggedUserId
      );

      const response = await axios.get(
        `${API}/complaints/my/${loggedUserId}`
      );

      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data?.complaints || [];

      console.log(
        "MY COMPLAINTS:",
        data
      );

      setComplaints(data);
      setViewMode("my");
    } catch (error) {
      console.error(
        "MY COMPLAINTS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load your complaints."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    if (
      loggedUserRole === "RESIDENT" ||
      loggedUserRole === "TENANT"
    ) {
      fetchMyComplaints();
    } else {
      fetchData();
    }
  }, []);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // -----------------------------------------------------
      // VALIDATION
      // -----------------------------------------------------

      if (!form.title.trim()) {
        alert("Please enter complaint title.");
        return;
      }

      if (!form.description.trim()) {
        alert(
          "Please enter complaint description."
        );
        return;
      }

      if (!form.societyId) {
        alert("Please select society.");
        return;
      }

      // -----------------------------------------------------
      // USER ID
      // -----------------------------------------------------

      let complaintUserId = form.userId;

      // Resident/Tenant automatically gets logged-in ID
      if (
        loggedUserRole === "RESIDENT" ||
        loggedUserRole === "TENANT"
      ) {
        complaintUserId = loggedUserId;
      }

      if (!complaintUserId) {
        alert("Please select user.");
        return;
      }

      // -----------------------------------------------------
      // FORM DATA
      // -----------------------------------------------------

      const formData = new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "userId",
        complaintUserId
      );

      formData.append(
        "societyId",
        form.societyId
      );

      if (form.vendorId) {
        formData.append(
          "vendorId",
          form.vendorId
        );
      }

      if (form.assignedTo) {
        formData.append(
          "assignedStaff",
          form.assignedTo
        );
      }

      if (form.feedback) {
        formData.append(
          "feedback",
          form.feedback
        );
      }

      if (form.rating) {
        formData.append(
          "rating",
          form.rating
        );
      }

      if (file) {
        formData.append(
          "file",
          file
        );
      }

      // -----------------------------------------------------
      // CREATE
      // -----------------------------------------------------

      if (!editingId) {
        await axios.post(
          `${API}/complaints`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Complaint added successfully."
        );
      }

      // -----------------------------------------------------
      // UPDATE
      // -----------------------------------------------------

      else {
        await axios.put(
          `${API}/complaints/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Complaint updated successfully."
        );
      }

      // -----------------------------------------------------
      // RESET
      // -----------------------------------------------------

      resetForm();

      // -----------------------------------------------------
      // REFRESH
      // -----------------------------------------------------

      if (
        loggedUserRole === "RESIDENT" ||
        loggedUserRole === "TENANT"
      ) {
        await fetchMyComplaints();
      } else {
        await fetchData();
      }
    } catch (error) {
      console.error(
        "COMPLAINT SAVE ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to save complaint."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      userId: "",
      societyId: "",
      vendorId: "",
      assignedTo: "",
      feedback: "",
      rating: "",
    });

    setFile(null);
    setEditingId(null);
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (complaint) => {
    setEditingId(complaint.id);

    setForm({
      title: complaint.title || "",
      description:
        complaint.description || "",
      userId:
        complaint.userId
          ? String(complaint.userId)
          : "",
      societyId:
        complaint.societyId
          ? String(complaint.societyId)
          : "",
      vendorId:
        complaint.vendorId
          ? String(complaint.vendorId)
          : "",
      assignedTo:
        complaint.assignedStaff || "",
      feedback:
        complaint.feedback || "",
      rating:
        complaint.rating
          ? String(complaint.rating)
          : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API}/complaints/${id}`
      );

      alert(
        "Complaint deleted successfully."
      );

      if (
        loggedUserRole === "RESIDENT" ||
        loggedUserRole === "TENANT"
      ) {
        await fetchMyComplaints();
      } else {
        await fetchData();
      }
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete complaint."
      );
    }
  };

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `${API}/complaints/${id}`,
        {
          status,
        }
      );

      if (
        loggedUserRole === "RESIDENT" ||
        loggedUserRole === "TENANT"
      ) {
        await fetchMyComplaints();
      } else {
        await fetchData();
      }
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update status."
      );
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredComplaints =
    useMemo(() => {
      return complaints.filter(
        (complaint) => {
          const keyword =
            search.toLowerCase();

          const matchesSearch =
            !keyword ||
            complaint.title
              ?.toLowerCase()
              .includes(keyword) ||
            complaint.description
              ?.toLowerCase()
              .includes(keyword) ||
            complaint.user?.name
              ?.toLowerCase()
              .includes(keyword) ||
            complaint.vendor?.name
              ?.toLowerCase()
              .includes(keyword);

          const matchesStatus =
            statusFilter === "ALL" ||
            complaint.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      complaints,
      search,
      statusFilter,
    ]);

  // =========================================================
  // STATUS COUNTS
  // =========================================================

  const totalCount =
    complaints.length;

  const openCount =
    complaints.filter(
      (item) =>
        item.status === "OPEN"
    ).length;

  const progressCount =
    complaints.filter(
      (item) =>
        item.status ===
        "IN_PROGRESS"
    ).length;

  const resolvedCount =
    complaints.filter(
      (item) =>
        item.status ===
        "RESOLVED"
    ).length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div style={pageStyle}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            Complaints Management
          </h1>

          <p style={subtitleStyle}>
            Manage, track and resolve
            society complaints
          </p>
        </div>

        <div style={roleBadgeStyle}>
          {loggedUserRole || "USER"}
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div style={statsGridStyle}>
        <StatCard
          title="Total Complaints"
          value={totalCount}
        />

        <StatCard
          title="Open"
          value={openCount}
        />

        <StatCard
          title="In Progress"
          value={progressCount}
        />

        <StatCard
          title="Resolved"
          value={resolvedCount}
        />
      </div>

      {/* =====================================================
          VIEW BUTTONS
      ===================================================== */}

      <div style={toolbarStyle}>
        <div style={buttonGroupStyle}>
          {loggedUserRole !==
            "RESIDENT" &&
            loggedUserRole !==
              "TENANT" && (
              <button
                onClick={() => {
                  setViewMode("all");
                  fetchData();
                }}
                style={
                  viewMode === "all"
                    ? activeButtonStyle
                    : secondaryButtonStyle
                }
              >
                All Complaints
              </button>
            )}

          <button
            onClick={
              fetchMyComplaints
            }
            style={
              viewMode === "my"
                ? activeButtonStyle
                : secondaryButtonStyle
            }
          >
            My Complaints
          </button>
        </div>

        <div style={filterGroupStyle}>
          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search complaints..."
            style={searchStyle}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            style={filterStyle}
          >
            <option value="ALL">
              All Status
            </option>

            <option value="OPEN">
              Open
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="RESOLVED">
              Resolved
            </option>
          </select>
        </div>
      </div>

      {/* =====================================================
          CREATE FORM
      ===================================================== */}

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>
          <div>
            <h2 style={sectionTitleStyle}>
              {editingId
                ? "Edit Complaint"
                : "Create New Complaint"}
            </h2>

            <p style={sectionSubtitleStyle}>
              {editingId
                ? "Update complaint details"
                : "Submit a new complaint"}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={cancelButtonStyle}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
        >
          <div style={formGridStyle}>
            {/* TITLE */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Complaint Title *
              </label>

              <input
                name="title"
                value={form.title}
                onChange={
                  handleChange
                }
                placeholder="e.g. Water Leakage"
                style={inputStyle}
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Description *
              </label>

              <input
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                placeholder="Describe the issue"
                style={inputStyle}
                required
              />
            </div>

            {/* USER */}

            {(loggedUserRole !==
              "RESIDENT" &&
              loggedUserRole !==
                "TENANT") && (
              <div style={fieldStyle}>
                <label
                  style={labelStyle}
                >
                  Resident / User *
                </label>

                <select
                  name="userId"
                  value={
                    form.userId
                  }
                  onChange={
                    handleChange
                  }
                  style={inputStyle}
                  required
                >
                  <option value="">
                    Select User
                  </option>

                  {users.map(
                    (user) => (
                      <option
                        key={
                          user.id
                        }
                        value={
                          user.id
                        }
                      >
                        {user.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

            {/* SOCIETY */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Society *
              </label>

              <select
                name="societyId"
                value={
                  form.societyId
                }
                onChange={
                  handleChange
                }
                style={inputStyle}
                required
              >
                <option value="">
                  Select Society
                </option>

                {societies.map(
                  (society) => (
                    <option
                      key={
                        society.id
                      }
                      value={
                        society.id
                      }
                    >
                      {society.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* VENDOR */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Vendor
              </label>

              <select
                name="vendorId"
                value={
                  form.vendorId
                }
                onChange={
                  handleChange
                }
                style={inputStyle}
              >
                <option value="">
                  Select Vendor
                </option>

                {vendors.map(
                  (vendor) => (
                    <option
                      key={
                        vendor.id
                      }
                      value={
                        vendor.id
                      }
                    >
                      {vendor.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* ASSIGN STAFF */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Assign Staff
              </label>

              <input
                name="assignedTo"
                value={
                  form.assignedTo
                }
                onChange={
                  handleChange
                }
                placeholder="Staff name"
                style={inputStyle}
              />
            </div>

            {/* FEEDBACK */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Feedback
              </label>

              <input
                name="feedback"
                value={
                  form.feedback
                }
                onChange={
                  handleChange
                }
                placeholder="Feedback"
                style={inputStyle}
              />
            </div>

            {/* RATING */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Rating
              </label>

              <select
                name="rating"
                value={
                  form.rating
                }
                onChange={
                  handleChange
                }
                style={inputStyle}
              >
                <option value="">
                  Select Rating
                </option>

                <option value="1">
                  1 - Very Poor
                </option>

                <option value="2">
                  2 - Poor
                </option>

                <option value="3">
                  3 - Average
                </option>

                <option value="4">
                  4 - Good
                </option>

                <option value="5">
                  5 - Excellent
                </option>
              </select>
            </div>

            {/* FILE */}

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Supporting Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
                style={fileInputStyle}
              />
            </div>
          </div>

          {/* FORM BUTTON */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "22px",
            }}
          >
            <button
              type="submit"
              disabled={saving}
              style={
                saving
                  ? disabledButtonStyle
                  : primaryButtonStyle
              }
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Complaint"
                : "Add Complaint"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={
                  secondaryButtonStyle
                }
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* =====================================================
          COMPLAINT TABLE
      ===================================================== */}

      <div style={cardStyle}>
        <div style={tableHeaderStyle}>
          <div>
            <h2
              style={
                sectionTitleStyle
              }
            >
              {viewMode === "my"
                ? "My Complaints"
                : "All Complaints"}
            </h2>

            <p
              style={
                sectionSubtitleStyle
              }
            >
              {filteredComplaints.length}{" "}
              complaint(s) found
            </p>
          </div>
        </div>

        {loading ? (
          <div style={loadingStyle}>
            Loading complaints...
          </div>
        ) : (
          <div
            style={
              tableWrapperStyle
            }
          >
            <table
              style={tableStyle}
            >
              <thead>
                <tr>
                  <th style={thStyle}>
                    Complaint
                  </th>

                  <th style={thStyle}>
                    Resident
                  </th>

                  <th style={thStyle}>
                    Society
                  </th>

                  <th style={thStyle}>
                    Image
                  </th>

                  <th style={thStyle}>
                    Staff / Vendor
                  </th>

                  <th style={thStyle}>
                    Rating
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>

                  <th style={thStyle}>
                    Date
                  </th>

                  <th style={thStyle}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.length >
                0 ? (
                  filteredComplaints.map(
                    (complaint) => (
                      <tr
                        key={
                          complaint.id
                        }
                        style={
                          tableRowStyle
                        }
                      >
                        {/* COMPLAINT */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={
                              complaintTitleStyle
                            }
                          >
                            {
                              complaint.title
                            }
                          </div>

                          <div
                            style={
                              complaintDescriptionStyle
                            }
                          >
                            {
                              complaint.description
                            }
                          </div>
                        </td>

                        {/* USER */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {complaint
                            .user
                            ?.name ||
                            users.find(
                              (u) =>
                                Number(
                                  u.id
                                ) ===
                                Number(
                                  complaint.userId
                                )
                            )?.name ||
                            "-"}
                        </td>

                        {/* SOCIETY */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {complaint
                            .society
                            ?.name ||
                            societies.find(
                              (s) =>
                                Number(
                                  s.id
                                ) ===
                                Number(
                                  complaint.societyId
                                )
                            )?.name ||
                            "-"}
                        </td>

                        {/* IMAGE */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {complaint.image ? (
                            <img
                              src={
                                complaint.image.startsWith(
                                  "http"
                                )
                                  ? complaint.image
                                  : `http://localhost:5000${complaint.image}`
                              }
                              alt="Complaint"
                              style={
                                imageStyle
                              }
                            />
                          ) : (
                            <span
                              style={
                                noImageStyle
                              }
                            >
                              No Image
                            </span>
                          )}
                        </td>

                        {/* STAFF/VENDOR */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {complaint
                            .vendor
                            ?.name ||
                            complaint.assignedStaff ||
                            "-"}
                        </td>

                        {/* RATING */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {complaint.rating ? (
                            <span
                              style={
                                ratingStyle
                              }
                            >
                              ★{" "}
                              {
                                complaint.rating
                              }
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>

                        {/* STATUS */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {loggedUserRole !==
                            "RESIDENT" &&
                          loggedUserRole !==
                            "TENANT" ? (
                            <select
                              value={
                                complaint.status ||
                                "OPEN"
                              }
                              onChange={(
                                e
                              ) =>
                                handleStatusChange(
                                  complaint.id,
                                  e.target
                                    .value
                                )
                              }
                              style={
                                getStatusStyle(
                                  complaint.status
                                )
                              }
                            >
                              <option value="OPEN">
                                OPEN
                              </option>

                              <option value="IN_PROGRESS">
                                IN PROGRESS
                              </option>

                              <option value="RESOLVED">
                                RESOLVED
                              </option>
                            </select>
                          ) : (
                            <span
                              style={
                                getStatusBadgeStyle(
                                  complaint.status
                                )
                              }
                            >
                              {
                                complaint.status
                              }
                            </span>
                          )}
                        </td>

                        {/* DATE */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {complaint.createdAt
                            ? new Date(
                                complaint.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        {/* ACTIONS */}

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={
                              actionStyle
                            }
                          >
                            <button
                              onClick={() =>
                                handleEdit(
                                  complaint
                                )
                              }
                              style={
                                editButtonStyle
                              }
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  complaint.id
                                )
                              }
                              style={
                                deleteButtonStyle
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      style={
                        emptyStyle
                      }
                    >
                      <div
                        style={{
                          fontSize:
                            "40px",
                          marginBottom:
                            "10px",
                        }}
                      >
                        📋
                      </div>

                      <strong>
                        No complaints found
                      </strong>

                      <p
                        style={{
                          marginTop:
                            "6px",
                          color:
                            "#94a3b8",
                        }}
                      >
                        Try changing your
                        search or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
}) {
  return (
    <div style={statCardStyle}>
      <div
        style={
          statTitleStyle
        }
      >
        {title}
      </div>

      <div
        style={
          statValueStyle
        }
      >
        {value}
      </div>
    </div>
  );
}

// =========================================================
// STYLES
// =========================================================

const pageStyle = {
  minHeight: "100vh",
  background: "#f4f7fb",
  padding: "32px",
  boxSizing: "border-box",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  marginBottom: "28px",
};

const titleStyle = {
  margin: 0,
  fontSize: "36px",
  fontWeight: "800",
  color: "#172033",
};

const subtitleStyle = {
  margin: "8px 0 0",
  color: "#64748b",
  fontSize: "15px",
};

const roleBadgeStyle = {
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "8px 15px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "700",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  marginBottom: "24px",
};

const statCardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "22px",
  boxShadow:
    "0 4px 18px rgba(15,23,42,0.06)",
};

const statTitleStyle = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "600",
};

const statValueStyle = {
  marginTop: "8px",
  color: "#0f172a",
  fontSize: "30px",
  fontWeight: "800",
};

const toolbarStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "16px",
  marginBottom: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
  boxShadow:
    "0 4px 18px rgba(15,23,42,0.05)",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const filterGroupStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const activeButtonStyle = {
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  padding: "11px 18px",
  borderRadius: "9px",
  fontWeight: "700",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  border: "1px solid #dbe2ea",
  background: "#ffffff",
  color: "#334155",
  padding: "11px 18px",
  borderRadius: "9px",
  fontWeight: "600",
  cursor: "pointer",
};

const searchStyle = {
  width: "230px",
  padding: "11px 13px",
  border: "1px solid #dbe2ea",
  borderRadius: "9px",
  outline: "none",
};

const filterStyle = {
  padding: "11px 13px",
  border: "1px solid #dbe2ea",
  borderRadius: "9px",
  background: "#ffffff",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "25px",
  boxShadow:
    "0 4px 20px rgba(15,23,42,0.06)",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "22px",
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "21px",
  fontWeight: "750",
  color: "#1e293b",
};

const sectionSubtitleStyle = {
  margin: "5px 0 0",
  color: "#94a3b8",
  fontSize: "13px",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "18px",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#475569",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  border: "1px solid #dbe2ea",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#1e293b",
  fontSize: "14px",
  outline: "none",
};

const fileInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px",
  border: "1px solid #dbe2ea",
  borderRadius: "10px",
  background: "#f8fafc",
};

const primaryButtonStyle = {
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  padding: "13px 25px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const disabledButtonStyle = {
  ...primaryButtonStyle,
  background: "#94a3b8",
  cursor: "not-allowed",
};

const cancelButtonStyle = {
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  color: "#64748b",
  padding: "9px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const tableHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const tableWrapperStyle = {
  overflowX: "auto",
  width: "100%",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  minWidth: "1200px",
};

const thStyle = {
  padding: "14px 13px",
  background: "#f1f5f9",
  color: "#334155",
  fontSize: "13px",
  fontWeight: "750",
  textAlign: "left",
  borderBottom:
    "1px solid #e2e8f0",
};

const tdStyle = {
  padding: "14px 13px",
  color: "#334155",
  fontSize: "14px",
  borderBottom:
    "1px solid #f1f5f9",
  verticalAlign: "middle",
};

const tableRowStyle = {
  transition: "background 0.2s",
};

const complaintTitleStyle = {
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "5px",
};

const complaintDescriptionStyle = {
  color: "#64748b",
  maxWidth: "190px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const imageStyle = {
  width: "65px",
  height: "55px",
  objectFit: "cover",
  borderRadius: "8px",
  border:
    "1px solid #e2e8f0",
};

const noImageStyle = {
  color: "#94a3b8",
  fontSize: "13px",
};

const ratingStyle = {
  color: "#f59e0b",
  fontWeight: "700",
};

const actionStyle = {
  display: "flex",
  gap: "7px",
};

const editButtonStyle = {
  border: "none",
  background: "#06b6d4",
  color: "#ffffff",
  padding: "7px 12px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

const deleteButtonStyle = {
  border: "none",
  background: "#ef4444",
  color: "#ffffff",
  padding: "7px 12px",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

const emptyStyle = {
  padding: "60px 20px",
  textAlign: "center",
  color: "#64748b",
};

const loadingStyle = {
  padding: "50px",
  textAlign: "center",
  color: "#64748b",
};

function getStatusBadgeStyle(
  status
) {
  if (status === "RESOLVED") {
    return {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "20px",
      background: "#dcfce7",
      color: "#166534",
      fontSize: "12px",
      fontWeight: "700",
    };
  }

  if (status === "IN_PROGRESS") {
    return {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "20px",
      background: "#fef3c7",
      color: "#92400e",
      fontSize: "12px",
      fontWeight: "700",
    };
  }

  return {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#fee2e2",
    color: "#991b1b",
    fontSize: "12px",
    fontWeight: "700",
  };
}

function getStatusStyle(status) {
  if (status === "RESOLVED") {
    return {
      padding: "7px 10px",
      borderRadius: "8px",
      border: "1px solid #86efac",
      background: "#f0fdf4",
      color: "#166534",
      fontWeight: "700",
    };
  }

  if (status === "IN_PROGRESS") {
    return {
      padding: "7px 10px",
      borderRadius: "8px",
      border: "1px solid #fcd34d",
      background: "#fffbeb",
      color: "#92400e",
      fontWeight: "700",
    };
  }

  return {
    padding: "7px 10px",
    borderRadius: "8px",
    border: "1px solid #fecaca",
    background: "#fef2f2",
    color: "#991b1b",
    fontWeight: "700",
  };
}

export default Complaints;