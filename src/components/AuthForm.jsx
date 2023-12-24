import { Link } from "react-router-dom";
import styles from "../scripts/loginForm.module.css";
import clearIcon from "../assets/clear.svg";
import { useState } from "react";

const AuthForm = ({ onAuthSubmit }) => {
  const [scenario, setScenario] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAuthSubmit({ scenario, email, password, admin });
  };

  const switchScenario = (newScenario) => {
    setScenario(newScenario);
  };

  return (
    <>
      <div className={styles.logcontainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.clearIconBox}>
            <a href="https://react.dev" target="_blank">
              <img src={clearIcon} className={styles.clearIcon} alt="clear" />
            </a>
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
                <input
                  id="password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.adminBox}>
                <label htmlFor="admin">Administrator:</label>
                <input
                  id="admin"
                  type="checkbox"
                  value={admin}
                  name="admin"
                  onChange={(e) => setAdmin(e.target.checked)}
                />
              </div>
              <div className={styles.submitBtn}>
                <input
                  type="submit"
        
                  value="Create account"
                />
              </div>
              <div className={styles.bottomArea}>
                <div className={styles.bottomLeftArea}>
                  <span>Already have an account</span>
                  <input
                    type="button"
                    className={styles.underlineBtn}
                    onClick={() => switchScenario("login")}
                    value="login"
                  />
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
                <input
                  id="password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={styles.submitBtn}>
                <input
                  type="submit"
                  value="login"
                />
              </div>
              <div className={styles.bottomArea}>
                <div>
                  <span>Don't have an account?</span>
                  <input
                    type="button"
                    className={styles.underlineBtn}
                    onClick={() => switchScenario("signup")}
                    value="signup"
                  />
                </div>
                <input
                  type="button"
                  className={styles.underlineBtn}
                  value="Forgot password?"
                  onClick={() => switchScenario("forgot-password")}
                />
              </div>
            </>
          )}

          {scenario === "forgot-password" && (
            <>
              <h2 className={styles.formTitle}>Update your password</h2>
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
              <div className={styles.submitBtn}>
                <input
                  type="submit"
                  value="Update password"
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
