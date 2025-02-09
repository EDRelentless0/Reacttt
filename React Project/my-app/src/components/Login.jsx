import React, { useState } from "react";
import Validation from "./LoginValidation";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login({ updateUsername }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [showOTPInput, setShowOTPInput] = useState(false); // OTP alanını göstermek için state

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // localStorage'dan username ve token'i al
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    // Kullanıcı zaten giriş yapmışsa /login sayfasına erişim engellensin
    if (storedUsername && storedToken) {
      console.log("Kullanıcı zaten giriş yapmış.");
      navigate("/"); // Başka bir sayfaya yönlendir
      return; // Fonksiyonu burada sonlandır
    }

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending login request with values:", values);
        const res = await axios.post("http://localhost:8081/login", values, {
          withCredentials: true,
        });
        console.log("Response:", res.data);

        if (res.data.message === "OTP oluşturuldu. Lütfen OTP'yi girin.") {
          setShowOTPInput(true);
        } else if (res.data.token) {
          // Kullanıcı bilgilerini local storage'e kaydet
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("token", res.data.token);
          // Kullanıcı adını ve token'i güncelle
          updateUsername(res.data.username);

          console.log("Giriş başarılı");
          navigate("/");
        } else {
          console.log("Böyle bir kayıt bulunmamaktadır:", res.data.error);
          alert(res.data.error || "Böyle bir kayıt bulunmamaktadır");
        }
      } catch (err) {
        console.error("Bir süre sonra tekrar deneyiniz.:", err);
        alert("Bir süre sonra tekrar deneyiniz.");
      }
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();

    try {
      // OTP doğrulama isteği gönder
      const res = await axios.post("http://localhost:8081/verify-otp", {
        email: values.email,
        otp: values.otp,
      });

      if (res.data.token) {
        // OTP doğrulaması başarılı
        console.log("OTP doğrulaması başarılı:", res.data);
        // Kullanıcı bilgilerini local storage'e kaydet
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.token);

        // Kullanıcı adını ve token'i güncelle
        updateUsername(res.data.username); // Doğru kullanım
        navigate("/"); // Ana sayfaya yönlendir
      } else {
        // Hatalı OTP doğrulaması
        console.log("OTP doğrulaması başarısız:", res.data.error);
        alert(res.data.error || "OTP doğrulaması başarısız");
      }
    } catch (err) {
      console.error("OTP doğrulama hatası:", err);
      alert("OTP doğrulama hatası");
    }
  };

  const handleAnasayfaClick = () => {
    // Kayıt sayfasına yönlendirme işlemi
    navigate("/");
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
              color: location.pathname === "/login" ? "#000" : "#333333",
              fontWeight: location.pathname === "/login" ? "bold" : "normal",
              fontSize: "20px",
              cursor: "pointer",
            }}
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
              color: location.pathname === "/signup" ? "#000" : "#333333",
              fontWeight: location.pathname === "/signup" ? "bold" : "normal",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Kayıt Ol
          </h3>
        </div>
        <form
          action=""
          onSubmit={showOTPInput ? handleOTPSubmit : handleSubmit}
          style={{ width: "100%" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email:
            </label>
            <input
              type="text"
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

          {showOTPInput && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                OTP Kodu:
              </label>
              <input
                name="otp"
                type="text"
                placeholder="OTP kodunu giriniz"
                onChange={handleInput}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #CCC",
                }}
              />
              {errors.otp && <span style={{ color: "red" }}>{errors.otp}</span>}
            </div>
          )}

          <div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px 15px",
                backgroundColor: "#555555",
                color: "#FFF",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "16px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(0,0,0, 0.5)")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#555555")}
            >
              {showOTPInput ? "Onayla" : "Giriş Yap"}
            </button>
          </div>
        </form>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            backgroundColor: "#555555",
            color: "#FFF",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100%",
            fontSize: "16px",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(0,0,0, 0.5)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#555555")}
          onClick={handleAnasayfaClick}
        >
          Ana sayfa
        </button>
      </div>
    </div>
  );
}

export default Login;
