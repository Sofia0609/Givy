import { useState } from "react";
import users from "../../data/users.json";
import "./login.css";

function Login({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [entryEmail, setEntryEmail] = useState("");
  const [entryPassword, setEntryPassword] = useState("");

  function handleAuth() {
    const userFound = users.find((user) => user.email === entryEmail);
    if (!userFound) {
      alert("No existe una cuenta con ese email");
      return;
    }
    if (userFound.password === entryPassword) {
      alert("Login exitoso");
      localStorage.setItem("loggeduser", JSON.stringify(userFound));
      onNavigate("feed");
    } else {
      alert("Contraseña incorrecta");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <img src="/src/assets/logo.png" alt="Givy" />
          <h1 className="login-brand">Givy</h1>
          <p className="login-tagline">Learn. Teach. Connect.</p>
        </div>
        <div className="login-form">
          <div className="login-field">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Example: Dianac@ejemplo.com"
              value={entryEmail}
              onChange={(e) => setEntryEmail(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Example123*"
              value={entryPassword}
              onChange={(e) => setEntryPassword(e.target.value)}
            />
          </div>
          <button className="login-btn" onClick={handleAuth}>
            Log In
          </button>
          <p className="login-footer">
            Don't have an account?{" "}
            <span onClick={() => onNavigate("register")}>Sign up.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;