import { useState } from 'react'
import { useNavigate } from 'react-router'
import users from '../../../data/users.json'
import './SignUp.css'
import logo from '../../../assets/Logotype.png'
import InputGivy from '../../../components/inputGivy/inputGivy'
import ButtonGivy from '../../../components/buttonsGivy/buttonGivy/buttonGivy'


function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleContinue() {
        if (!name.trim() || !email.trim() || !password.trim()) {
            alert('Please fill in all fields')
            return
        }

        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
            alert('An account with this email already exists')
            return
        }

        const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
        const localUserExists = storedUsers.find(u => u.email === email)
        if (localUserExists) {
            alert('An account with this email already exists')
            return
        }
  
        const newUser = {
            id: `u${Date.now()}`, 
            username: name,
            at: `@${name.toLowerCase().replace(/\s/g, '')}`,
            email,
            password,
            bio: '',
            profilePicture: '../src/assets/profile_picture.png',
            followers: 0,
            following: 0,
            reputationAverage: 0,
            videoCount: 0,
            wantsToLearn: [],
            wantsToTeach: []
        }

        storedUsers.push(newUser)
        localStorage.setItem('signupUsers', JSON.stringify(storedUsers))
        localStorage.setItem('signupData', JSON.stringify({ name, email, password }))
        
        navigate('/LearnTags')
    }

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <div className="signup-logo">
                    <img src={logo} alt="Givy" />
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Join the skill exchange community</p>
                </div>
                <div className="signup-form">
                    <InputGivy
                        label="Name"
                        type="text"
                        placeholder="Example: Diana Cifuentes"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputGivy
                        label="E-mail"
                        type="email"
                        placeholder="Example: Dianac@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputGivy
                        label="Password"
                        type="password"
                        placeholder="Example123*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonGivy label="Continue" onClick={handleContinue} />
                    <p className="signup-footer">
                        Already have an account?{' '}
                        <span onClick={() => navigate('/Login')}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
