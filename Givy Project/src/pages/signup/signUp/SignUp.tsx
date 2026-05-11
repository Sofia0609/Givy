import { useState } from 'react'
import './signup.css'

interface SignUpProps {
    onNavigate: (page: string) => void
}

function SignUp({ onNavigate }: SignUpProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleContinue() {
        if (!name.trim() || !email.trim() || !password.trim()) {
            alert('Please fill in all fields')
            return
        }
        // guarda los datos temporalmente
        localStorage.setItem('signupData', JSON.stringify({ name, email, password }))
        onNavigate('learnTags')
    }

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <div className="signup-logo">
                    <img src="/src/assets/logo.png" alt="Givy" />
                </div>
                <h1 className="signup-title">Create Account</h1>
                <p className="signup-subtitle">Join the skill exchange community</p>

                <div className="signup-form">
                    <div className="signup-field">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Example: Diana Cifuentes"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="signup-field">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="Example: Dianac@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signup-field">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Example123*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="signup-btn" onClick={handleContinue}>
                        Continue
                    </button>
                    <p className="signup-footer">
                        Already have an account?{' '}
                        <span onClick={() => onNavigate('login')}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp