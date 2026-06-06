import { useState } from "react";
import "./login.css";
import InputGivy from "../../components/inputGivy/inputGivy";
import ButtonGivy from "../../components/buttonsGivy/buttonGivy/buttonGivy";
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginThunk } from '../../store/userSlice'

function Login() {
  const [entryEmail, setEntryEmail] = useState("")
  const [entryPassword, setEntryPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(state => state.user)

  async function handleAuth() {
    if (!entryEmail || !entryPassword) {
      alert('Por favor ingresa tu email y contraseña')
      return
    }

    const result = await dispatch(loginThunk({ email: entryEmail, password: entryPassword }))

    if (loginThunk.fulfilled.match(result)) {
      navigate('/Feed')
    } else {
      alert('Email o contraseña incorrectos')
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
          {error && <p className="login-error">{error}</p>}
          <ButtonGivy label={loading ? 'Logging in...' : 'Log In'} onClick={handleAuth} />
          <p className="login-footer">
            Don't have an account?{" "}
            <span onClick={() => navigate("/SignUp")}>Sign up.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
