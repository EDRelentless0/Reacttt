function Validation(values) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!values.email) {
    errors.email = "Emaili boş bırakamazsınız!";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Lütfen uygun Email koyunuz!";
  }

  if (!values.password) {
    errors.password = "Parolayı boş bırakamazsınız!";
  } else if (!password_pattern.test(values.password)) {
    errors.password =
      "Şifrenizi hatalı veya eksik girmiş olabilirsiniz! (8 ile 24 karakter arası kullanılmış olmalı!)";
  }

  return errors;
}

export default Validation;
