import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/api.js";
import UserList from "../components/UserList.jsx";

function MainPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const canListUsers = user?.role?.label !== "Deactivated user";

  const fetchUsers = useCallback(async () => {
    if (!canListUsers) {
      setMessage("You do not have permission to list users.");
      setUsers([]);
      return;
    }
    try {
      const response = await api.get("/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(response.data);
      setMessage("");
    } catch (err) {
      console.error(
        "Failed to fetch users:",
        err.response?.data || err.message
      );
      setMessage("Failed to fetch users.");
      setUsers([]);
    }
  }, [user, canListUsers]);

  return (
    <div>
      <h2>
        Welcome, {user?.username}! Du bist: ({user?.role.label})
      </h2>
      <button onClick={logout}>Logout</button>
      <hr />
      <button onClick={fetchUsers} disabled={!canListUsers}>
        List All Users
      </button>
      {message && <p>{message}</p>}
      {users.length > 0 && (
        <UserList users={users} loggedInUser={user} fetchUsers={fetchUsers} />
      )}
    </div>
  );
}

export default MainPage;
