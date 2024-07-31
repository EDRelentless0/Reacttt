import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <nav className={`sidebar ${isNavbarFixed ? "fixed" : ""}`}>
      <div
        className="sidebar-item"
        onClick={() => handleIconClick("/settings")}
      >
        <FontAwesomeIcon icon={faGear} />
        <span>Settings</span>
      </div>
      <div className="sidebar-item" onClick={() => handleIconClick("/profile")}>
        <FontAwesomeIcon icon={faUser} />
        <span>Profile</span>
      </div>
    </nav>
  );
}

export default Settings;
