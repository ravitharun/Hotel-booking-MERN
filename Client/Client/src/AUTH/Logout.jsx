import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const redirect = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("ISLogin");
    localStorage.removeItem("token");
    setTimeout(() => {
      redirect("/login");
    }, 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h2>You are logged in</h2>
      <button
        style={{
          padding: "10px 24px",
          background: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
        }}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
