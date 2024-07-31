import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  NavLink,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Homepage";
import Duyurular from "./components/Duyurular";
import Haberler from "./components/Haberler";
import Videolar from "./components/Videolar";
import Resimler from "./components/Resimler";
import Fanarts from "./components/Fanarts";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Settings from "./components/Settings";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear } from "@fortawesome/free-solid-svg-icons";

function App() {
  const handleSettings = () => {
    navigate("/settings");
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null); // Kullanıcı adı için state

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

  useEffect(() => {
    // localStorage'den username'i al
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const showNavbar = () => {
    return !(location.pathname === "/login" || location.pathname === "/signup");
  };

  // Kullanıcı adını güncelleyen fonksiyon
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
    // localStorage'a username'i kaydet
    localStorage.setItem("username", newUsername);
  };

  return (
    <>
      {showNavbar() && (
        <nav
          style={{
            display: "flex",
            height: "70px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
            padding: "10px",
            width: "100%",
            position: isNavbarFixed ? "fixed" : "relative", // Dynamically set position
            zIndex: "2000",
            top: "0",
          }}
        >
          <div style={{ marginLeft: "700px" }}>
            <NavLink
              to="/"
              className="nav-link"
              style={{ color: "black", fontFamily: "cursive" }}
            >
              Anasayfa
            </NavLink>
            <NavLink
              to="/haberler"
              className="nav-link"
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "cursive",
              }}
            >
              Haberler
            </NavLink>
            <NavLink
              to="/duyurular"
              className="nav-link"
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "cursive",
              }}
            >
              Duyurular
            </NavLink>
            <NavLink
              to="/videolar"
              className="nav-link"
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "cursive",
              }}
            >
              Videolar
            </NavLink>
            <NavLink
              to="/resimler"
              className="nav-link"
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "cursive",
              }}
            >
              Resimler
            </NavLink>
            <NavLink
              to="/fanarts"
              className="nav-link"
              style={{
                marginLeft: "20px",
                color: "black",
                fontFamily: "cursive",
              }}
            >
              Fanarts
            </NavLink>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "30px",
            }}
          >
            {username ? (
              <>
                <p
                  style={{
                    color: "black",
                    marginRight: "10px",
                    fontFamily: "cursive",
                  }}
                >
                  {username}
                </p>
                <FontAwesomeIcon
                  className="nav-link"
                  onClick={handleSettings}
                  icon={faGear}
                  style={{
                    color: "black",
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                />
                <Logout />
                {/* Logout bileşenini ekleyin */}
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="nav-link"
                  style={{ color: "black", fontFamily: "cursive" }}
                >
                  {" "}
                  <FontAwesomeIcon
                    style={{ fontSize: "15px" }}
                    icon={faUser}
                  />{" "}
                </NavLink>
              </>
            )}
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/haberler" element={<Haberler />} />
        <Route path="/duyurular" element={<Duyurular />} />
        <Route path="/videolar" element={<Videolar />} />
        <Route path="/resimler" element={<Resimler />} />
        <Route path="/fanarts" element={<Fanarts />} />
        <Route
          path="/login"
          element={<Login updateUsername={updateUsername} />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
