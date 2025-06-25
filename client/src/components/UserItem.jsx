import React from "react";
import api from "../api/api.js";

function UserItem({ user, loggedInUser, fetchUsers }) {
  const handleEdit = async () => {
    // In a real application, this would navigate to an edit page or open a modal
    // For simplicity, we'll just log for now.
    alert(`Editing user: ${user.username}`);
    // Example of an API call for editing (you'd send updated data)
    // try {
    //   await api.put(`/users/${user._id}`, { /* updated data */ }, {
    //     headers: { Authorization: `Bearer ${loggedInUser.token}` },
    //   });
    //   fetchUsers(); // Refresh list after edit
    // } catch (error) {
    //   console.error('Failed to edit user:', error);
    // }
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete user ${user.username}?`)
    ) {
      try {
        await api.delete(`/users/${user._id}`, {
          headers: { Authorization: `Bearer ${loggedInUser.token}` },
        });
        alert(`User ${user.username} deleted successfully.`);
        fetchUsers(); // Refresh list after deletion
      } catch (error) {
        console.error(
          "Failed to delete user:",
          error.response?.data || error.message
        );
        alert(`Failed to delete user ${user.username}.`);
      }
    }
  };

  const loggedInUserRole = loggedInUser?.role?.label;
  const isAdministrator = loggedInUserRole === "Administrator";
  const isModerator = loggedInUserRole === "Moderator";
  const isRegularUser = loggedInUserRole === "Regular user";

  const canEdit =
    isAdministrator ||
    isModerator ||
    (isRegularUser && loggedInUser._id === user._id);

  const canDelete = isAdministrator;

  return (
    <li>
      {user.username} ({loggedInUserRole}) - Location: {user.location}
      {canEdit && (
        <button onClick={handleEdit} style={{ marginLeft: "10px" }}>
          Edit
        </button>
      )}
      {canDelete && (
        <button onClick={handleDelete} style={{ marginLeft: "5px" }}>
          Delete
        </button>
      )}
    </li>
  );
}

export default UserItem;
