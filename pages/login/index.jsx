import { useState } from "react";
import { login } from "../../services/auth";
import styles from "../register/register.module.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const errorMessages = {
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isError = false;

    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });

    if (!isError) {
      try {
        const res = await login(formData);
        if (res.status === 200) {
          alert("Logged in successfully");
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        if (e.response.status === 400) {
          alert("Invalid email or password");
        }
      }
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.circleWrapper}>
            <div className={styles.circle}></div>
            <img
              src="../../src/assets/Group.png"
              alt="Logo"
              className={styles.logo}
            />
          </div>
          <h1>Welcome aboard my friend</h1>
          <p>Just a couple of clicks and we start</p>
        </div>

        <div className={styles.rightcontainer}>
          <h2 className={styles.title}>Login</h2>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className={styles.eyeIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className={styles.button3}>
              <button type="submit">Log in</button>
              <div className={styles.text}>Have no account yet?</div>
              <div className={styles.loginLink}>
                <Link to="/register"> Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
