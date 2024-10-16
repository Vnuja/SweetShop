import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.scss';

const Register = () => {
    const FullNameRef = useRef(null);
    const EmailRef = useRef(null);
    const ContactRef = useRef(null);
    const PasswordRef = useRef(null);
    const ConfirmPasswordRef = useRef(null); // Define ConfirmPasswordRef
    const AddressRef = useRef(null); // Define AddressRef

    const navigate = useNavigate(); // Initialize the navigate function from useNavigate

    function sendData(e) {
        e.preventDefault();

        const name = FullNameRef.current.value.trim();
        const email = EmailRef.current.value.trim();
        const telephone = ContactRef.current.value.trim();
        const password = PasswordRef.current.value.trim();
        const confirmPassword = ConfirmPasswordRef.current.value.trim();
        const address = AddressRef.current.value.trim(); // Get address value

        // Validate Full Name
        if (!name || name.length < 2) {
            alert("Please enter a valid name with at least 2 characters.");
            return;
        }

        // Validate Email Address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate Contact Number
        const phonePattern = /^\d{10}$/;
        if (!telephone || !phonePattern.test(telephone)) {
            alert("Please enter a valid contact number with 10 digits.");
            return;
        }

        // Validate Password
        if (!password || password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Validate Confirm Password
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            name: name,
            address: address, // Include address in user data
            email: email,
            tp_number: telephone,
            password: password
        };

        axios
            .post("http://localhost:8000/user/add", userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                alert("User Added");
                console.log("User added");
                navigate("/");
            })
            .catch((err) => {
                console.error("Error adding user:", err);
                alert("Error adding user. Check the console for details.");
            });
    }

    return (
        <div className="container">
            <div className="left">
                <div className="header">
                    <h2 className="animation a1">Create Account</h2>
                    <h4 className="animation a2">Don't have any account? <Link to="/">Login</Link></h4>
                </div>
                <div className="form">
                    <input type="text" className="form-field animation a3" placeholder="Full Name" ref={FullNameRef} />
                    <input type="email" className="form-field animation a3" placeholder="Email Address" ref={EmailRef} />
                    <input type="text" className="form-field animation a3" placeholder="Contact Number" ref={ContactRef} />
                    <input type="text" className="form-field animation a3" placeholder="Address" ref={AddressRef} /> {/* Address field */}
                    <input type="password" className="form-field animation a4" placeholder="Password" ref={PasswordRef} />
                    <input type="password" className="form-field animation a4" placeholder="Confirm Password" ref={ConfirmPasswordRef} />
                    <button className="animation a6" onClick={sendData}>Register</button>
                </div>
            </div>
            <div className="right"></div>
        </div>
    );
};

export default Register;

