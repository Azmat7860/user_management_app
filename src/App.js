import React from "react";
import {
  BrowserRouter as Router, // Provides routing functionality
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importing components
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import Header from "./components/Header";

const App = () => {
  return (
    // Router wraps the entire app to enable routing
    <Router>
      {/* Header component displayed across all pages */}
      <Header />

      {/* Routes define the navigation paths for the application */}
      <Routes>
        {/* Default route redirects to the Users page */}
        <Route path="/" element={<Navigate to="/users" />} />

        {/* Route to display the Users page */}
        <Route path="/users" element={<Users />} />

        {/* Route to display the Add User page */}
        <Route path="/add-user" element={<AddUser />} />

        {/* Route to display the Edit User page (with user ID passed as a parameter) */}
        <Route path="/add-user/:id" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

export default App;
