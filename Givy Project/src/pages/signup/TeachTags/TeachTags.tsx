import { useState } from 'react'
import { useNavigate } from 'react-router'
import tags from '../../../data/tags.json'
import './TeachTags.css'

function TeachTags() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string[]>([])

    function toggleTag(tagId: string) {
        setSelected(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }


    function handleCreateAccount() {
        if (selected.length === 0) {
            alert('Please select at least one topic')
            return
        }

        const signupData = JSON.parse(localStorage.getItem('signupData') || '{}')

        const newUser = {
            id: `u${Date.now()}`,
            username: signupData.name,
            at: `@${signupData.name.toLowerCase().replace(/\s/g, '')}`,
            email: signupData.email,
            password: signupData.password,
            bio: '',
            profilePicture: '../src/assets/profile_picture.png',
            followers: 0,
            following: 0,
            reputationAverage: 0,
            videoCount: 0,
            wantsToLearn: signupData.wantsToLearn || [],
            wantsToTeach: selected
        }

        const storedUsers = JSON.parse(localStorage.getItem('signupUsers') || '[]')
        storedUsers.push(newUser)
        localStorage.setItem('signupUsers', JSON.stringify(storedUsers))
        localStorage.setItem('loggeduser', JSON.stringify(newUser))
        localStorage.removeItem('signupData')
        
        navigate('/Feed')
    }

    return (
        <div className="tags-wrapper">
            <div className="tags-card">
                <div className="tags-logo">
                    <img src="/src/assets/logo.png" alt="Givy" />
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

                <button className="tags-btn" onClick={handleCreateAccount}>
                    Create Account
                </button>
            </div>
        </div>
    )
}

export default TeachTags