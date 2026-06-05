import { useParams, useNavigate } from 'react-router'
import { useEffect } from 'react'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import tags from '../../data/tags.json'
import './ProfileStyle.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProfileThunk, fetchProfileVideosThunk, followThunk, unfollowThunk, clearProfile } from '../../store/slices/profileSlice'

const getTagNames = (tagIds: string[]) =>
  tagIds.map(id => tags.find(t => t.id === id)?.name || id)

function ProfileView() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { viewedUser, videos, loading, error } = useAppSelector(state => state.profile)
  const { currentUser } = useAppSelector(state => state.user)

  useEffect(() => {
    if (!userId) return

    if (userId === currentUser?.id) {
      navigate('/Profile')
      return
    }

    dispatch(fetchProfileThunk(userId))
    dispatch(fetchProfileVideosThunk(userId))

    return () => {
      dispatch(clearProfile())
    }
  }, [userId, dispatch])

  if (loading) return <div>Cargando perfil...</div>
  if (error) return <div>Error: {error}</div>
  if (!viewedUser) return (
    <div className="profileLayout">
      <NavBar />
      <main className="profileMain">
        <p>Usuario no encontrado</p>
      </main>
    </div>
  )

  const isFollowing = currentUser?.followingList?.includes(viewedUser.id) ?? false

  function handleFollow() {
    if (!currentUser || !viewedUser) return
    if (isFollowing) {
      dispatch(unfollowThunk({ followerId: currentUser.id, targetId: viewedUser.id }))
    } else {
      dispatch(followThunk({ followerId: currentUser.id, targetId: viewedUser.id }))
    }
  }

  const teachingTags = getTagNames(viewedUser.wantsToTeach || [])
  const learningTags = getTagNames(viewedUser.wantsToLearn || [])

  return (
    <div className="profileLayout">
      <NavBar />
      <main className="profileMain">
        <ProfilePicture src={viewedUser.profilePicture || 'https://placehold.co/150'} size="large" />
        <ProfileName name={viewedUser.username} username={viewedUser.at} />
        <div className="profileStats">
          <UserInfo label="Following" count={viewedUser.following} />
          <UserInfo label="Followers" count={viewedUser.followers} />
          <UserInfo label="Videos" count={videos.length} />
          <UserInfo label="Reputation" count={viewedUser.reputationAverage} />
        </div>
        <p className="profileBio">{viewedUser.bio ?? 'no bio yet.'}</p>
        <button
          className={`profileFollowBtn ${isFollowing ? 'profileFollowBtn--following' : ''}`}
          onClick={handleFollow}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        <div className="profileTags">
          <TagsContainer title="TEACHING" tags={teachingTags} variant="teaching" options={tags} />
          <TagsContainer title="LEARNING" tags={learningTags} variant="learning" options={tags} />
        </div>
        <VideosContainer videos={videos} />
      </main>
    </div>
  )
}

export default ProfileView