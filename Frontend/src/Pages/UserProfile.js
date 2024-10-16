import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/UserProfile.css";
import jsPDF from "jspdf";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { id } = useParams(); // Extract user ID from URL
  const navigate = useNavigate();

  // State for user and profile image
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    tp_number: "",
    profilePic: "" // New field for profile picture
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // Preview image URL
  const [loading, setLoading] = useState(true); // Loading state
  const [editMode, setEditMode] = useState(false); // Track whether the form is in edit mode

  // Fetch logged-in user details based on the user ID from the URL
  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("Fetching user details for ID:", id); 
        const response = await axios.get(`http://localhost:8000/User/getid/${id}`); // Use the user ID from URL params
        if (response.data && response.data.user) {
          const userData = response.data.user;
          setUser(userData); // Set user data in state
          setImagePreviewUrl(userData.profilePic); // Set the image preview from the fetched data
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    getUser();
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value, // Update the user object with the new value
    });
  };

  // Handle user update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/User/update/${id}`, user); // Send updated user data to server
      if (response.status === 200) {
        alert("User updated successfully");
        setEditMode(false); // Exit edit mode after successful update
      }
    } catch (error) {
      console.error("Error updating user details:", error.message);
      alert("Error updating user. Check the console for details.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8000/user/delete/${user._id}`);
      if (response.status === 200) {
        alert("User deleted successfully");
        navigate("/"); // Redirect to home after deletion
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Error deleting user. Check the console for details.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("User Profile Report", 10, 10);
    doc.text(`Name: ${user.name}`, 10, 20);
    doc.text(`Email: ${user.email}`, 10, 30);
    doc.text(`Address: ${user.address}`, 10, 40);
    doc.text(`Phone Number: ${user.tp_number}`, 10, 50);
    doc.save(`${user.name}_Profile_Report.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="limiter">
      <Header />
      <div className="container-profile">
        <div className="profile-wrapper">
          {/* Profile Picture */}
          <div className="profile-pic-wrapper">
            <img
              src={imagePreviewUrl || "https://www.kindpng.com/picc/m/52-526237_avatar-profile-hd-png-download.png"}
              alt="Profile"
              className="profile-pic"
            />
          </div>

          {/* User Information */}
          <div className="user-info">
            <hr className="divider" />
            <div className="info-section">
              <div className="info-label"><strong>Name:</strong></div>
              <div className="info-value">
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name || "No name available"
                )}
              </div>
            </div>
            <hr className="divider" />
            <div className="info-section">
              <div className="info-label"><strong>Email:</strong></div>
              <div className="info-value">
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email || "No email available"
                )}
              </div>
            </div>
            <hr className="divider" />
            <div className="info-section">
              <div className="info-label"><strong>Address:</strong></div>
              <div className="info-value">
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.address || "No address available"
                )}
              </div>
            </div>
            <hr className="divider" />
            <div className="info-section">
              <div className="info-label"><strong>Phone Number:</strong></div>
              <div className="info-value">
                {editMode ? (
                  <input
                    type="text"
                    name="tp_number"
                    value={user.tp_number}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.tp_number || "No phone number available"
                )}
              </div>
            </div>
          </div>
          <hr className="divider" />

          {/* Action Buttons */}
          <div className="container-login100-form-btn">
            {editMode ? (
              <>
                <button className="login100-form-btn btncus" onClick={handleUpdate}>
                  Update Profile
                </button>
                <button className="login100-form-btn btncus" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="login100-form-btn btncus" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
                <button className="login100-form-btn btncus" onClick={handleDelete}>
                  Delete Account
                </button>
                <button className="login100-form-btn btncus" onClick={generatePDF}>
                  Generate Report
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
