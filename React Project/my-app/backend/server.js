require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userdb = require("./models/user");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb Bağlantısı kuruldu"))
  .catch((err) => console.error("mongodb bağlantısı kurulamadı" + err));

const loginLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 saniye
  max: 5, // Max 5 istek
  message: "Çok fazla istek yapıldı. Lütfen 30 Saniye sonra tekrar deneyin.",
  handler: (req, res) => {
    console.log(`IP ${req.ip} çok fazla istek yaptı.`);
    res.status(429).json({
      error: "Çok fazla istek yapıldı. Lütfen 30 saniye sonra tekrar deneyin.",
    });
  },
});

// JWT ile yetkilendirme fonksiyonu
const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Erişim reddedildi. Yetkilendirme bilgileri eksik." });
  }
  jwt.verify(token, "gizliAnahtar", (err, decodedToken) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res
        .status(403)
        .json({ error: "Token geçersiz veya süresi dolmuş." });
    }
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  });
};

// Güvenli rotaya JWT ile yetkilendirme ekleme
app.get("/secure-route", verifyToken, (req, res) => {
  res.json({
    message: "Bu güvenli rotaya erişim sağlandı.",
    userData: req.userData,
  });
});

// OTP oluşturma fonksiyonu
const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex"); // 6 haneli OTP oluşturur
};

const otpDB = new Map(); // OTP'leri saklamak için basit bir hafıza tabanı kullanıyoruz. Production'da bir veritabanı kullanın.

// Kullanıcı kaydı
app.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    let userExists = await userdb.exists({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Bu e-posta adresi zaten kullanılmış." });
    }

    const newUser = await userdb.create({
      username: name,
      email,
      password,
      phone,
    });
    console.log("User registered successfully:", email);

    const token = jwt.sign(
      { email: email, userId: newUser._id },
      "gizliAnahtar",
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .json({ message: "Kayıt başarıyla tamamlandı.", token });
  } catch (err) {
    console.error("Error during user signup:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// E-posta adresinin varlığını kontrol etme
app.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    let userExists = await userdb.exists({ email });
    if (userExists) {
      console.log("Email already exists:", email);
      return res
        .status(400)
        .json({ error: "Bu e-posta adresi zaten kullanılmış." });
    } else {
      console.log("Email is available:", email);
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Kullanıcı girişi ve OTP gönderme
app.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);
  try {
    const user = await userdb.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ error: "Kullanıcı bulunamadı." });
    }
    if (password === user.password) {
      const otp = generateOTP();
      otpDB.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // OTP 5 dakika geçerli
      console.log("Generated OTP:", otp, "for phone number:", user.phone);
      return res
        .status(200)
        .json({ message: "OTP oluşturuldu. Lütfen OTP'yi girin." });
    } else {
      console.log(`Kullanıcı için yanlış şifre: ${email}`);
      return res
        .status(400)
        .json({ error: "Kullanıcı bulunamadı veya şifre yanlış." });
    }
  } catch (err) {
    console.error("Database error:", err); // Hata mesajını konsola yazdır
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

// OTP doğrulama ve giriş tamamlama
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const storedOTP = otpDB.get(email);

  if (!storedOTP) {
    return res
      .status(400)
      .json({ error: "OTP bulunamadı veya süresi dolmuş." });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({ error: "Yanlış OTP." });
  }

  if (Date.now() > storedOTP.expiresAt) {
    otpDB.delete(email);
    return res.status(400).json({ error: "OTP'nin süresi dolmuş." });
  }

  otpDB.delete(email); // OTP doğrulandıktan sonra silinir

  const user = await userdb.findOne({ email });
  const token = jwt.sign(
    { email: user.email, userId: user._id },
    "gizliAnahtar",
    { expiresIn: "1d" }
  );

  return res.status(200).json({ message: "Giriş başarılı.", token });
});

// Rate limiting
app.use(loginLimiter);

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
