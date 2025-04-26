import React from "react";
import { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);

      // Send user data to backend
      // Send user data to backend API
      // NOTE: Replace the URL and request structure according to your backend API specifications
      await fetch("YOUR_API_ENDPOINT/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          userName,
          // Add any additional fields your API requires
        }),
      });

      alert("Sign-up successful!");
    } catch (error) {
      alert("Error signing up:", error);
    }
  };

  const style = {
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
      boxShadow: "1px 1px 2px rgba(0,0,0,0.2) ,-1px -1px 2px rgba(0,0,0,0.2)",
      borderRadius:"15px"
    },

    title: {
      fontSize: "30px",
      color:"darkgreen"
    },

    form_div: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      width: "100%",
    },

    input_area: {
      borderRadius: "10px",
      padding: "15px 10px",
      width: "65%",
      border: "none",
      backgroundColor: "rgb(226, 226, 226)",
    },

    radio_container: {
      display: "flex",
      gap: "15px",
      marginTop: "8px",
    },

    radio_option: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "14px",
    },

    label_style: {
      width: "65%",
    },

    button: {
      width: "67%",
      borderRadius: "10px",
      padding: "15px 0px",
      marginTop: "20px",
      border: "none",
      backgroundColor: "darkgreen",
      color: "white",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100vh",
        width: "100%",
        backgroundImage:"url(background.jpg)",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundClip:"content-box"
      }}
    >
      <div style={style.parent_div}>
        <h2 style={style.title}>EXPLORE PAKISTAN</h2>
        <form onSubmit={handleSignUp} style={style.form_div}>
          <label style={style.label_style}>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={style.input_area}
          />
          <label style={style.label_style}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={style.input_area}
          />
          <label style={style.label_style}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={style.input_area}
          />
          <button type="submit" style={style.button}>
            Sign Up
          </button>
        </form>
        <h2 style={{ marginBottom: "0px" }}></h2>
        <p style={{ marginBottom: "2rem" }}>
        already have an account!<Link to={"/login"}>  SignIn</Link> 
        </p>
      </div>
    </div>
  )
};

export default SignUp;
