import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Profile</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <img
          src={
            user?.photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          width="120"
        />

        <h3>{user?.name}</h3>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

        <p>
          <strong>Society:</strong>{" "}
          {user?.society?.name || "Not Assigned"}
        </p>
      </div>
    </div>
  );
}

export default Profile;