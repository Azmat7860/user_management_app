import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/addUser.css";

const AddUser = () => {
   // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    addresses: [{ street: "", city: "", location: "" }],
  });

  const navigate = useNavigate(); // For navigation
  const { id } = useParams(); // Get user ID from URL params

   // Fetch user data for editing when `id` exists
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((response) => setFormData(response.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Handle changes to form fields
  const handleChange = (e, index, field) => {
    const { name, value } = e.target;

    if (field === "addresses") {
      // Update address fields
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index][name] = value;
      setFormData({ ...formData, addresses: updatedAddresses });
    } else {
      // Update other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add a new address to the list
  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        { street: "", city: "", location: "" },
      ],
    });
  };

   // remove address from the list
  const removeAddress = (index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1); // Remove the address at the specified index
    setFormData({ ...formData, addresses: updatedAddresses });
  };

   // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? axios.put(`http://localhost:5000/users/${id}`, formData)
      : axios.post("http://localhost:5000/users", formData);

    apiCall.then(() => navigate("/users")).catch((err) => console.error(err));
  };

  return (
    <div className="add-user-page">
      <h1>{id ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleSubmit}>
         {/* Input fields for user details */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <h3>Addresses</h3>
        {/* Render multiple address fields dynamically */}
        {formData.addresses.map((address, index) => (
          <div key={index} className="address-container">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={(e) => handleChange(e, index, "addresses")}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={(e) => handleChange(e, index, "addresses")}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={address.location}
              onChange={(e) => handleChange(e, index, "addresses")}
            />
            {/* Display Remove Address button if more than one address exists */}
            {formData.addresses.length > 1 && (
              <button
                type="button"
                className="remove-address-btn"
                onClick={() => removeAddress(index)}
              >
                Remove Address
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-address-btn" onClick={addAddress}>
          Add Address
        </button>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {id ? "Update User" : "Add User"}
          </button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/users")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
