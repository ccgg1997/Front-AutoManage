import React, { useState, useEffect } from "react";
import axios from "axios";
import UserUpdate from "../forms/user/userUpdateForm";
function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="dark:bg-slate-950">
      <UserUpdate />
    </div>
  );
}

export default Profile;
