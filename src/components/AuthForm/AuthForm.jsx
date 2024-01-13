import { Link } from "react-router-dom";
import styles from "./loginForm.module.css";
import clearIcon from "../../assets/clear.svg";
import { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

const AuthForm = ({ onAuthSubmit,scenario: initialScenario }) => {
  const [scenario, setScenario] = useState(initialScenario);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [showpassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    onAuthSubmit({ scenario, email, password, admin });
  };

  const switchScenario = (newScenario) => {
    setScenario(newScenario);
  };

  const handlePasswordClick = () =>{
    setShowPassword(!showpassword);
  }

  return (
    <>
      <div className={styles.logcontainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.clearIconBox}>
            <Link to="/login">
              <img src={clearIcon} className={styles.clearIcon} alt="clear" />
            </Link>
          </div>
          {scenario === "signup" && (
            <>
              <h2 className={styles.formTitle}>Sign up an account</h2>
              <div className={styles.emailgroup}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.passwordgroup}>
                <label htmlFor="password">Password:</label>
                <div className={styles.passwordField}>
                  <input
                    id="password"
                    type={showpassword ? "text" : "password"}
                    value={password}
                    name="password"
                    className={styles.passwordInput}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className={styles.showPasswordIcon} onClick={handlePasswordClick}>{showpassword?<PiEye size={25} />:<PiEyeClosed  size={25}/>}</div>
                </div>
              </div>
              <div className={styles.adminBox}>
                <label htmlFor="admin">Administrator:</label>
                <input
                  id="admin"
                  type="checkbox"
                  className={styles.checkbox}
                  value={admin}
                  name="admin"
                  onChange={(e) => setAdmin(e.target.checked)}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Create account"
                  className={styles.submitBtn}
                />
              </div>
              <div className={styles.bottomArea}>
                <div className={styles.bottomLeftArea}>
                  <span>Already have an account</span>
                  {/* <input
                    type="button"
                    className={styles.underlineBtn}
                    onClick={() => switchScenario("login")}
                    value="login"
                  /> */}
                  <Link to="/login">login</Link>
                  </div>
              </div>
            </>
          )}

          {scenario === "login" && (
            <>
              <h2 className={styles.formTitle}>Sign in to your account</h2>
              <div className={styles.emailgroup}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.passwordgroup}>
                <label htmlFor="password">Password:</label>
                <div className={styles.passwordField}>
                  <input
                    id="password"
                    type={showpassword ? "text" : "password"}
                    value={password}
                    name="password"
                    className={styles.passwordInput}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className={styles.showPasswordIcon} onClick={handlePasswordClick}>{showpassword?<PiEye size={25} />:<PiEyeClosed  size={25}/>}</div>
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Sign In"
                  className={styles.submitBtn}
                />
              </div>
              <div className={styles.bottomArea}>
                <div>
                  <span>Don't have an account? </span>

                  <Link to="/signup">signup</Link>
                </div>
                <Link to="/updatePassword">Forgot password?</Link>

              </div>
            </>
          )}

          {scenario === "forgot-password" && (
            <>
              <h2 className={styles.formTitle}>Update your password</h2>
              <span>Enter your email link, we will send you the recovery link</span>
              <div className={styles.emailgroup}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Update password"
                  className={styles.submitBtn}
                  onClick={() => switchScenario("sent-email")}
                />
              </div>
            </>
          )}
          {scenario === "sent-email" && (
            <>
              <p>
                We have sent the update password link to your email, please
                check that ！
              </p>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default AuthForm;