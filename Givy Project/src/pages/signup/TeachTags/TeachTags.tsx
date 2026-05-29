import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import tags from '../../../data/tags.json'
import './TeachTags.css'
import logo from '../../../assets/Logotype.png'
import { signUpUser } from '../../../services/authService'
import { setUser } from '../../../store/userSlice'

function TeachTags() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    function toggleTag(tagId: string) {
        setSelected(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    async function handleCreateAccount() {
        if (selected.length === 0) {
            alert('Please select at least one topic')
            return
        }

        const signupData = JSON.parse(sessionStorage.getItem('signupData') || '{}')

        if (!signupData.name || !signupData.email || !signupData.password) {
            alert('Missing signup information. Please start over.')
            navigate('/SignUp')
            return
        }

        try {
            setLoading(true)

            // Llama a Supabase: crea cuenta + perfil
            const newUser = await signUpUser({
                name: signupData.name,
                email: signupData.email,
                password: signupData.password,
                wantsToLearn: signupData.wantsToLearn || [],
                wantsToTeach: selected
            })

            // Guarda el usuario en Redux
            dispatch(setUser(newUser))

            // Limpia el sessionStorage
            sessionStorage.removeItem('signupData')

            // Al feed!
            navigate('/Feed')

        } catch (error: any) {
            alert('Error creating account: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="tags-wrapper">
            <div className="tags-card">
                <div className="tags-logo">
                    <img src={logo} alt="Givy" />
                </div>
                <h1 className="tags-title">What would you like to teach?</h1>
                <p className="tags-subtitle">Choose your favorites</p>

                <div className="tags-grid">
                    {tags.map(tag => (
                        <button
                            key={tag.id}
                            className={`tag-chip ${selected.includes(tag.id) ? 'tag-chip--selected' : ''}`}
                            onClick={() => toggleTag(tag.id)}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>

                <button 
                    className="tags-btn" 
                    onClick={handleCreateAccount}
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </div>
        </div>
    )
}

export default TeachTags