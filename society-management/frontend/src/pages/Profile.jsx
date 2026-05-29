import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem("user")
      );

    setUser(data);
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
}

export default Profile;