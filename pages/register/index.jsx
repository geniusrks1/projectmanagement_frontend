import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./register.module.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    checkBox: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validation logic...

    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className={styles.register}>
      <div className={styles.container}>
     
        <div className={styles.leftcontainer}>
          <div className={styles.circleWrapper}>
            <div className={styles.circle}></div>
            <img src="/assets/Group.png" alt="Logo" className={styles.logo} />
          </div>
          <h1>Welcome aboard my friend</h1>
          <p>Just a couple of clicks and we start</p>
        </div>

    
        <div className={styles.rightcontainer}>
          <h2 className={styles.title}>Register</h2>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
              <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <FaLock />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <div className={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

<div className={styles.button3}>
            <button type="submit">Register</button>
           <div className={styles.text}>Have an account?</div> 
            <div className={styles.loginLink}><Link to="/login"> Log in</Link></div>
</div>

          </form>
        </div>
      </div>
    </div>
  );
}
