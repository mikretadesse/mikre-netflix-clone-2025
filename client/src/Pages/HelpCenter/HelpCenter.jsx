import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./HelpCenter.module.css";

function HelpCenter() {
  const navigate = useNavigate();

  return (
    <div className={styles.Help_center}>
      <div className={styles.container}>
        <h1 className={styles.title}>How can we help you?</h1>
      </div>
      <div className={styles.description}>
        <p>Netflix Help Center • This is a demo page</p>
      </div>
      <button className={styles.button} onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
}

export default HelpCenter;
