import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import './EditProfile.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { updateProfileThunk } from '../../store/userSlice'

function EditProfile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentUser, loading } = useAppSelector(state => state.user)

  const [name, setName] = useState(currentUser?.username || '')
  const [username, setUsername] = useState(currentUser?.at || '')
  const [description, setDescription] = useState(currentUser?.bio || '')

  async function handleConfirm() {
    if (!currentUser) return

    await dispatch(updateProfileThunk({
      id: currentUser.id,
      changes: {
        username: name,
        at: username,
        bio: description,
      }
    }))

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
        </div>

        <button
          className="editConfirmBtn"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Confirm'}
        </button>

      </main>
    </div>
  )
}

export default EditProfile