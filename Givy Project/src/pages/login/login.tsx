import { useState } from "react";
import users from "../../data/users.json";
import "./login.css";
import InputGivy from "../../components/inputGivy/inputGivy";
import ButtonGivy from "../../components/buttonGivy/ProfileButton/buttonGivy";
import { useNavigate } from 'react-router'

function Login() {
  const [entryEmail, setEntryEmail] = useState("");
  const [entryPassword, setEntryPassword] = useState("");
  const navigate = useNavigate();

  function handleAuth() {

    let userFound = users.find((user) => user.email === entryEmail);
    

    if (!userFound) {
      const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
      userFound = storedUsers.find(u => u.email === entryEmail)
    }

    if (!userFound) {
      alert('No existe una cuenta con ese email')
      return
    }

    if (userFound.password === entryPassword) {

      localStorage.setItem('loggeduser', JSON.stringify(userFound))

      setTimeout(() => {
        navigate('/Feed')
      }, 100)
    } else {
      alert('Contraseña incorrecta')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <img src="/src/assets/Logotype.png" alt="Givy" />
          <p className="login-tagline">Learn. Teach. Connect.</p>
        </div>
        <div className="login-form">
          <InputGivy
            label="E-mail"
            type="email"
            placeholder="Example: Dianac@ejemplo.com"
            value={entryEmail}
            onChange={(e) => setEntryEmail(e.target.value)}
          />
          <InputGivy
            label="Password"
            type="password"
            placeholder="Example123*"
            value={entryPassword}
            onChange={(e) => setEntryPassword(e.target.value)}
          />
          <ButtonGivy label="Log In" onClick={handleAuth} />
          <p className="login-footer">
            Don't have an account?{" "}
            <span onClick={() => navigate("/SignUp")}>Sign up.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;