import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Logout() {
  const handleLogout = () => {
    // LocalStorage temizleme
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Sayfayı yenileme
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleLogout} className="nav-link">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ marginRight: "5px", color: "black" }}
        />
      </button>
    </div>
  );
}

export default Logout;
