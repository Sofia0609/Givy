import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import tags from '../../data/tags.json'
import './EditProfile.css'

function EditProfile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('loggeduser') || '{}')

  const [name, setName] = useState(user.username || '')
  const [username, setUsername] = useState(user.at || '')
  const [description, setDescription] = useState(user.bio || '')
  const [teaches, setTeaches] = useState(user.wantsToTeach?.[0] || '')
  const [learns, setLearns] = useState(user.wantsToLearn?.[0] || '')

  function handleConfirm() {
    const updated = {
      ...user,
      username: name,
      at: username,
      bio: description,
      wantsToTeach: teaches ? [teaches] : user.wantsToTeach,
      wantsToLearn: learns ? [learns] : user.wantsToLearn,
    }
    localStorage.setItem('loggeduser', JSON.stringify(updated))
    navigate('/Profile')
  }

  return (
    <div className="editLayout">
      <NavBar />
      <main className="editMain">

        <div className="editHeader">
          <button className="editBack" onClick={() => navigate('/Profile')}>‹</button>
          <span className="editTitle">Edit profile</span>
        </div>

        <div className="editPhoto">
          <div className="editPhotoCircle">
            <span className="editPhotoIcon">📷</span>
          </div>
          <span className="editPhotoLabel">Change photo</span>
        </div>

        <div className="editFields">
          <div className="editField">
            <label>Name</label>
            <input
              type="text"
              placeholder="Example: Diana Cifuentes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="editField">
            <label>Username</label>
            <input
              type="text"
              placeholder="Example: diana_00"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="editField">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="editField">
            <label>Skill I Can Teach </label>
            <select value={teaches} onChange={(e) => setTeaches(e.target.value)}>
              <option value="">Select a skill</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>

          <div className="editField">
            <label>Skill I Can Learn </label>
            <select value={learns} onChange={(e) => setLearns(e.target.value)}>
              <option value="">Select a skill</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="editConfirmBtn" onClick={handleConfirm}>
          Confirm
        </button>

      </main>
    </div>
  )
}

export default EditProfile