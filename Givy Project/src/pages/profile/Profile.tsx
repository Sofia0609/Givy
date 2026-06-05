import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import ProfileButton from '../../components/buttonsGivy/buttonGivy/buttonGivy'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import './ProfileStyle.css'
import tags from '../../data/tags.json'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logoutThunk, updateProfileThunk } from '../../store/userSlice'
import { fetchProfileVideosThunk } from '../../store/slices/profileSlice'
import LoadingScreen from '../../components/guards/LoadingScreen'
import ErrorScreen from '../../components/guards/ErrorScreen'

const getTagNames = (tagIds: string[]) =>
  tagIds.map(id => tags.find(t => t.id === id)?.name || id)

function Profile() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser, loading, error } = useAppSelector(state => state.user)
  const { videos } = useAppSelector(state => state.profile)

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchProfileVideosThunk(currentUser.id))
    }
  }, [currentUser?.id, dispatch])

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />
  if (!currentUser) {
    navigate('/Login')
    return null
  }

  const teachingTags = getTagNames(currentUser.wantsToTeach || [])
  const learningTags = getTagNames(currentUser.wantsToLearn || [])

  function handleAddTeaching(tag: string) {
    if (!currentUser) return
    const updated = [...(currentUser.wantsToTeach || []), tag]
    dispatch(updateProfileThunk({ id: currentUser.id, changes: { wantsToTeach: updated as any } }))
  }

  function handleAddLearning(tag: string) {
    if (!currentUser) return
    const updated = [...(currentUser.wantsToLearn || []), tag]
    dispatch(updateProfileThunk({ id: currentUser.id, changes: { wantsToLearn: updated as any } }))
  }

  function handleRemoveTeaching(tag: string) {
    if (!currentUser) return
    const updated = (currentUser.wantsToTeach || []).filter((t: string) => t !== tag)
    dispatch(updateProfileThunk({ id: currentUser.id, changes: { wantsToTeach: updated as any } }))
  }

  function handleRemoveLearning(tag: string) {
    if (!currentUser) return
    const updated = (currentUser.wantsToLearn || []).filter((t: string) => t !== tag)
    dispatch(updateProfileThunk({ id: currentUser.id, changes: { wantsToLearn: updated as any } }))
  }

 function handleLogout() {
  const confirmed = window.confirm('¿Estás seguro de que quieres cerrar sesión?')
  if (!confirmed) return
  dispatch(logoutThunk())
  navigate('/Login')
}

  return (
    <div className="profileLayout">
      <NavBar />
      <main className="profileMain">
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
        <ProfilePicture src={currentUser.profilePicture || 'https://placehold.co/150'} size="large" />
        <ProfileName name={currentUser.username} username={currentUser.at} />
        <div className="profileStats">
          <UserInfo label="Following" count={currentUser.following} />
          <UserInfo label="Followers" count={currentUser.followers} />
          <UserInfo label="Videos" count={videos.length} />
          <UserInfo label="Reputation" count={currentUser.reputationAverage} />
        </div>
        <p className="profileBio">{currentUser.bio ?? 'no bio yet.'}</p>
        <ProfileButton label="Edit profile" onClick={() => navigate('/EditProfile')} />
        <div className="profileTags">
          <TagsContainer
            title="TEACHING"
            tags={teachingTags}
            variant="teaching"
            options={tags}
            onAddTag={handleAddTeaching}
            onRemoveTag={handleRemoveTeaching}
          />
          <TagsContainer
            title="LEARNING"
            tags={learningTags}
            variant="learning"
            options={tags}
            onAddTag={handleAddLearning}
            onRemoveTag={handleRemoveLearning}
          />
        </div>
        <VideosContainer videos={videos} />
      </main>
    </div>
  )
}

export default Profile