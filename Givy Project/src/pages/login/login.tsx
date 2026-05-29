import { useState } from "react";
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import "./login.css";
import InputGivy from "../../components/inputGivy/inputGivy";
import ButtonGivy from "../../components/buttonsGivy/buttonGivy/buttonGivy";
import { loginUser } from '../../services/userService'
import { setUser } from '../../store/userSlice'

function Login() {
  const [entryEmail, setEntryEmail] = useState("");
  const [entryPassword, setEntryPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleAuth() {
    if (!entryEmail.trim() || !entryPassword.trim()) {
      alert('Please fill in all fields')
      return
    }

    try {
      setLoading(true)

      // Llama a Supabase, autentica y trae el perfil
      const user = await loginUser(entryEmail, entryPassword)

      // Guarda el usuario en Redux
      dispatch(setUser(user))

      // Va al Feed
      navigate('/Feed')

    } catch (error: any) {
      alert('Login failed: ' + error.message)
    } finally {
      setLoading(false)
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
          <ButtonGivy 
            label={loading ? "Logging in..." : "Log In"} 
            onClick={handleAuth} 
          />
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