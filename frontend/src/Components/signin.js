import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Define basic styles or remove completely if you want to use CSS files instead
  // Replace API_BASE_URL with your actual server URL
  const API_BASE_URL = "http://localhost:8080"; // Change this to your API endpoint

  // Modified login handler to route based on email address
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Send token to your backend server
      // Change the endpoint URL to match your server configuration
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, 
          password
        })
      });

      if (!response.ok) {
        throw new Error("Invalid login attempt");
      }

      // Check if the email is admin@gmail.com and redirect accordingly
      if (email.toLowerCase() === "admin@gmail.com") {
        console.log("Admin login successful, navigating to Admin Dashboard...");
        navigate("/adminDashBoard");
      } else {
        console.log("User login successful, navigating to User Dashboard...");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const style = {
    signIn: {
      backgroundImage: "url(background.jpg)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundClip: "content-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "100vh",
      width: "100%",
    },

    parent_div: {
      backgroundColor: "rgba(193, 193, 193, 0.5)",
      WebkitBackdropFilter: "blur(5px)",
      backdropFilter: "blur(5px)",
      marginRight: "250px",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      boxShadow:
        "1px 1px 2px rgba(255, 255, 255, 0.3) ,-1px -1px 2px rgba(255, 255, 255, 0.3)",
      color: "white",
      borderRadius: "20px",
    },

    title: {
      fontSize: "30px",
      color: "darkgreen"
    },

    form_div: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      color: "black"
    },

    input_area: {
      borderRadius: "10px",
      padding: "15px 10px",
      width: "67%",
      border: "none",
      backgroundColor: "rgb(226, 226, 226)",
    },

    button: {
      width: "69%",
      borderRadius: "10px",
      padding: "15px 0px",
      marginTop: "20px",
      border: "none",
      backgroundColor: "darkgreen",
      color: "white",
    },
  };

  return (
    <div style={style.signIn}>
      <div style={style.parent_div}>
        <h2 style={style.title}>EXPLORE PAKISTAN</h2>
        <form onSubmit={handleLogin} style={style.form_div}>
          <label style={{ width: "67%" }}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={style.input_area}
          />
          <label style={{ width: "67%" }}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={style.input_area}
          />
          <button type="submit" style={style.button}>
            Login
          </button>
        </form>
        <h2 style={{ marginBottom: "0px", color: "black" }}></h2>
        <p style={{ marginBottom: "2rem", color: "black" }}>
          dont have an account?<Link to={"/signUp"}>   SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;