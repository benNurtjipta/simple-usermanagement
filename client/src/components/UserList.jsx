import React from "react";
import UserItem from "./UserItem.jsx";

function UserList({ users, loggedInUser, fetchUsers }) {
  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            loggedInUser={loggedInUser}
            fetchUsers={fetchUsers}
          />
        ))}
      </ul>
    </div>
  );
}

export default UserList;
