import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignOut.module.css";

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("User signed out!");
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className={styles.signout_page}>
      <div className={styles.container}>
        <img
          className={styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        <h1 className={styles.title}>You have signed out</h1>
        <p className={styles.subtitle}>Thank you for watching Netflix.</p>
        <button className={styles.signout_btn} onClick={handleSignOut}>
          Sign In Again
        </button>
      </div>
    </div>
  );
}

export default SignOut;
