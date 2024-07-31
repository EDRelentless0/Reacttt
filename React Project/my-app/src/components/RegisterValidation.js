import axios from "axios";

async function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  const name_pattern = /^[a-zA-Z0-9_-]{3,16}$/; // Sadece harf, rakam, tire ve alt çizgi, 3 ila 16 karakter uzunluğunda
  const phone_pattern = /^[0-9]{10,15}$/; // 10 ila 15 rakam içeren telefon numarası

  if (values.name === "") {
    error.name = "Kullanıcı adını boş bırakamazsınız!";
  } else if (!name_pattern.test(values.name)) {
    error.name =
      "Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir. 3 ile 16 karakter uzunluğunda olmalıdır.";
  }

  if (values.email === "") {
    error.email = "Emaili boş bırakamazsınız!";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Lütfen uygun Email koyunuz!";
  } else {
    try {
      const response = await axios.post("http://localhost:8081/check-email", {
        email: values.email,
      });
      if (response.status === 400) {
        error.email = "Bu e-posta adresi zaten kullanılmış.";
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        error.email = "Bu e-posta adresi zaten kullanılmış.";
      } else {
        error.email = "Sunucu hatası, lütfen daha sonra tekrar deneyin.";
      }
    }
  }

  if (values.password === "") {
    error.password = "Parolayı boş bırakamazsınız!";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Lütfen uygun parola koyunuz! (8 ile 24 karakter arası)";
  }

  if (values.phone === "") {
    error.phone = "Telefon numarasını boş bırakamazsınız!";
  } else if (!phone_pattern.test(values.phone)) {
    error.phone =
      "Lütfen geçerli bir telefon numarası giriniz! (10 ila 15 rakam arasında)";
  }

  return error;
}

export default Validation;
