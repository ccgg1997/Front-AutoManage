import UserUpdate from "../forms/user/userUpdateForm";
/**
 * Renders a user profile page.
 *
 * @returns {JSX.Element} The rendered user profile page.
 */
function Profile() {
  return (
    <div className="min-h-screen">
      <UserUpdate />
    </div>
  );
}

export default Profile;
