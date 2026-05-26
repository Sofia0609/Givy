import { useState } from 'react'
import { useNavigate } from 'react-router'
import tags from '../../../data/tags.json'
import './LearnTags.css'
import logo from '../../../assets/Logotype.png'

function LearnTags() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<string[]>([])

    function toggleTag(tagId: string) {
        setSelected(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        )
    }

    function handleContinue() {
        if (selected.length === 0) {
            alert('Please select at least one topic')
            return
        }
        const signupData = JSON.parse(localStorage.getItem('signupData') || '{}')
        localStorage.setItem('signupData', JSON.stringify({ ...signupData, wantsToLearn: selected }))
        navigate('/TeachTags')
    }

    return (
        <div className="tags-wrapper">
            <div className="tags-card">
                <div className="tags-logo">
                    <img src={logo} alt="Givy" />
                </div>
                <h1 className="tags-title">What would you like to learn?</h1>
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

                <button className="tags-btn" onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default LearnTags