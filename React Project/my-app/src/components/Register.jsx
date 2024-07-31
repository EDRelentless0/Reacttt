import React, { useState } from "react";
import Validation from "./RegisterValidation";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Signup() {
  const handleAnasayfaClick = () => {
    window.location.href = "http://localhost:3000";
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    // Boşlukları kaldırarak input değerini güncelle
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value.trim(), // Boşlukları kaldır
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun otomatik olarak submit edilmesini engeller
    const validationErrors = await Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8081/signup",
          values
        );
        console.log(response.data);
        // Kayıt başarılı olduysa yapılacak işlemler
        navigate("/login"); // Örneğin, başarılı sayfasına yönlendirme
      } catch (error) {
        if (
          error.response &&
          error.response.data === "Bu e-posta adresi zaten kullanılmış."
        ) {
          setErrors({ email: "Bu e-posta adresi zaten kullanılmış." });
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage:
          "url('https://c.wallhere.com/photos/6f/89/1920x1080_px_beach_clouds_island_landscape_nature_Palm_Trees_sand-663479.jpg!d')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "40px",
          height: "auto",
          width: "400px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: location.pathname === "/login" ? "#000" : "normal",
              fontWeight: location.pathname === "/login" ? "bold" : "#333333",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </h2>
          <span
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              backgroundColor: "black",
              height: "50px",
              width: "2px",
              opacity: "0.2",
            }}
          ></span>
          <h3
            style={{
              color: location.pathname === "/signup" ? "#000" : "normal",
              fontWeight: location.pathname === "/signup" ? "bold" : "#333333",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Kayıt Ol
          </h3>
        </div>
        <form action="" onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Kullanıcı adı:
            </label>
            <input
              name="name"
              type="text"
              placeholder="Kullanıcı adı"
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #CCC",
              }}
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email adresinizi giriniz"
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #CCC",
              }}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Phone:
            </label>
            <input
              type="phone"
              name="phone"
              placeholder="Telefon numaranızı giriniz"
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #CCC",
              }}
            />
            {errors.phone && (
              <span style={{ color: "red" }}>{errors.phone}</span>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Şifre:
            </label>
            <input
              name="password"
              type="password"
              placeholder="Şifrenizi giriniz"
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #CCC",
              }}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Şifre Onayı:
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Şifrenizi tekrar giriniz"
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #CCC",
              }}
            />
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
            )}
          </div>

          <div>
            <button
              onClick={handleSubmit} // Kayıt ol fonksiyonunu çağıran olay işleyici
              style={{
                width: "100%",
                padding: "10px 15px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#FFF",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "16px",
                marginBottom: "5px", // Butonlar arası boşluk
                transition: "background-color 0.3s", // Renk değişim animasyonu
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(0,0,0, 0.5)")
              } // Mouse üzerine gelince renk değişimi
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#555555")} // Mouse ayrılınca eski renge dönüş
            >
              Onayla
            </button>
          </div>
          <div>
            <button
              onClick={handleAnasayfaClick} // Geri dön fonksiyonunu çağıran olay işleyici
              style={{
                width: "100%",
                padding: "10px 15px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#FFF",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "16px",
                transition: "background-color 0.3s", // Renk değişim animasyonu
                marginTop: "5px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(0,0,0, 0.5)")
              } // Mouse üzerine gelince renk değişimi
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#555555")} // Mouse ayrılınca eski renge dönüş
            >
              Ana Sayfa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
