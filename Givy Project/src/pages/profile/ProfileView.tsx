import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import usersData from '../../data/users.json'
import videos from '../../data/videos.json'
import tags from '../../data/tags.json'
import './Profile.css'

const getTagNames = (tagIds: string[]) =>
  tagIds.map(id => tags.find(t => t.id === id)?.name || id)

function ProfileView() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const loggedUser = JSON.parse(localStorage.getItem('loggeduser') || '{}')

  // Si el userId es el del usuario logueado, redirige a /Profile
  useEffect(() => {
    if (userId === loggedUser.id) {
      navigate('/Profile')
    }
  }, [userId])

  // Busca el usuario en localStorage primero (por si ya fue modificado), si no en el json
  const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
  const userFromStorage = savedUsers.find((u: any) => u.id === userId)
  const userFromJson = usersData.find(u => u.id === userId)
  const viewedUser = userFromStorage || userFromJson

  if (!viewedUser) {
    return (
      <div className="profileLayout">
        <NavBar />
        <main className="profileMain">
          <p>Usuario no encontrado</p>
        </main>
      </div>
    )
  }

  // Revisa si el usuario logueado ya sigue a este usuario
  const isFollowing = () => {
    const saved = JSON.parse(localStorage.getItem('loggeduser') || '{}')
    return saved.followingList?.includes(viewedUser.id) ?? false
  }

  const [following, setFollowing] = useState(isFollowing())
  const [followersCount, setFollowersCount] = useState(viewedUser.followers)

  function handleFollow() {
    const saved = JSON.parse(localStorage.getItem('loggeduser') || '{}')
    const followingList = saved.followingList || []

    if (following) {
      // Unfollow
      saved.followingList = followingList.filter((id: string) => id !== viewedUser.id)
      saved.following = (saved.following || 0) - 1
     setFollowersCount((prev: number) => prev - 1)
      // Actualiza followers del usuario visto
      updateUserInStorage(viewedUser.id, { followers: followersCount - 1 })
    } else {
      // Follow
      saved.followingList = [...followingList, viewedUser.id]
      saved.following = (saved.following || 0) + 1
      setFollowersCount((prev: number) => prev + 1)

      // Actualiza followers del usuario visto
      updateUserInStorage(viewedUser.id, { followers: followersCount + 1 })
    }

    localStorage.setItem('loggeduser', JSON.stringify(saved))
    setFollowing(!following)
  }

  function updateUserInStorage(id: string, changes: object) {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const baseUsers = allUsers.length > 0 ? allUsers : usersData

    const updated = baseUsers.map((u: any) =>
      u.id === id ? { ...u, ...changes } : u
    )
    localStorage.setItem('users', JSON.stringify(updated))
  }

  const teachingTags = getTagNames(viewedUser.wantsToTeach || [])
  const learningTags = getTagNames(viewedUser.wantsToLearn || [])
  const profileVideos = videos.filter(v => v.userId === viewedUser.id)

  return (
    <div className="profileLayout">
      <NavBar />
      <main className="profileMain">
        <ProfilePicture src={viewedUser.profilePicture} size="large" />
        <ProfileName name={viewedUser.username} username={viewedUser.at} />
        <div className="profileStats">
          <UserInfo label="Following" count={viewedUser.following} />
          <UserInfo label="Followers" count={followersCount} />
          <UserInfo label="Videos" count={viewedUser.videoCount} />
          <UserInfo label="Reputation" count={viewedUser.reputationAverage} />
        </div>
        <p className="profileBio">{viewedUser.bio ?? 'no bio yet.'}</p>
        <button
          className={`profileFollowBtn ${following ? 'profileFollowBtn--following' : ''}`}
          onClick={handleFollow}
        >
          {following ? 'Following' : 'Follow'}
        </button>
        <div className="profileTags">
          <TagsContainer title="TEACHING" tags={teachingTags} variant="teaching" />
          <TagsContainer title="LEARNING" tags={learningTags} variant="learning" />
        </div>
        <VideosContainer videos={profileVideos} />
      </main>
    </div>
  )
}

export default ProfileView