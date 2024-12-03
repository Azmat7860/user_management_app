import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/users.css";

const Users = () => {
  const [users, setUsers] = useState([]); // State to store users
  const navigate = useNavigate(); // Navigation hook

  // Fetch users from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to delete a user by ID
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id))) // Update state after deletion
      .catch((err) => console.error(err));
  };

  return (
    <div className="users-page">
      <h1>Users</h1>
      {users.length === 0 ? (
        // Show message if no users are found
        <p>Users not found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  {/* Edit button */}
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/add-user/${user.id}`)}
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
