import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import './EditProfile.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { updateProfileThunk, logoutThunk } from '../../store/userSlice'
import { supabase } from '../../lib/supabase'
import { uploadAvatar } from '../../services/userService'
import { setUser } from '../../store/userSlice'

function EditProfile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentUser, loading } = useAppSelector(state => state.user)

  const [name, setName] = useState(currentUser?.username || '')
  const [username, setUsername] = useState(currentUser?.at || '')
  const [description, setDescription] = useState(currentUser?.bio || '')
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.profilePicture || '')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !currentUser) return

    setAvatarPreview(URL.createObjectURL(file))
    setUploading(true)

    try {
      const publicUrl = await uploadAvatar(currentUser.id, file)
      dispatch(setUser({ ...currentUser, profilePicture: publicUrl }))
    } catch (error) {
      alert('Error al subir la foto. Intenta de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  async function handleConfirm() {
    if (!currentUser) return
    const confirmed = window.confirm('¿Estás seguro de guardar los cambios?')
    if (!confirmed) return
    await dispatch(updateProfileThunk({
      id: currentUser.id,
      changes: { username: name, at: username, bio: description }
    }))
    navigate('/Profile')
  }

  async function handleDeleteAccount() {
    if (!currentUser) return
    const confirmed = window.confirm('¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.')
    if (!confirmed) return
    const doubleConfirm = window.confirm('¿Confirmas que quieres eliminar tu cuenta permanentemente?')
    if (!doubleConfirm) return
    const { error } = await supabase.auth.admin.deleteUser(currentUser.id)
    if (error) {
      alert('Hubo un error al eliminar la cuenta. Intenta de nuevo.')
      return
    }
    await dispatch(logoutThunk())
    navigate('/Login')
  }

  return (
    <div className="editLayout">
      <NavBar />
      <main className="editMain">
        <div className="editHeader">
          <button className="editBack" onClick={() => navigate('/Profile')}>‹</button>
          <span className="editTitle">Edit profile</span>
        </div>
        <div className="editPhoto" onClick={() => fileInputRef.current?.click()}>
          <div className="editPhotoCircle">
            {avatarPreview
              ? <img src={avatarPreview} alt="avatar" className="editPhotoImg" />
              : <span className="editPhotoIcon">📷</span>
            }
          </div>
          <span className="editPhotoLabel">
            {uploading ? 'Uploading...' : 'Change photo'}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
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
        <button className="editConfirmBtn" onClick={handleConfirm} disabled={loading || uploading}>
          {loading ? 'Saving...' : 'Confirm'}
        </button>
        <button className="editDeleteBtn" onClick={handleDeleteAccount}>
          Delete account
        </button>
      </main>
    </div>
  )
}

export default EditProfile