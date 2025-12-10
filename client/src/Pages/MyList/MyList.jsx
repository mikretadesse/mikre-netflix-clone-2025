import React from "react";
import Styles from "./MyList.module.css";

const MyList = () => {
  const handleLoginClick = () => {
    alert("This is a demo page. Login is not implemented yet.");
  };
  return (
    <div className={Styles.mylist_page}>
      <h2 className={Styles.page_title}>My List</h2>
      <div className={Styles.login_prompt}>
        <div className={Styles.empty}>
          This feature requires login. Please sign in to continue.
        </div>
        <button className={Styles.login_btn} onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default MyList;
