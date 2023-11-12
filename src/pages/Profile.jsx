import React, { useState, useEffect } from "react";
import axios from "axios";
import UserUpdate from "../forms/user/userUpdateForm";
/**
 * Renders a user profile page.
 *
 * @returns {JSX.Element} The rendered user profile page.
 */
function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen">
      <UserUpdate />
    </div>
  );
}

export default Profile;
