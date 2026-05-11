import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import ProfileButton from '../../components/buttonGivy/ProfileButton/buttonGivy'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import './Profile.css'
import videos from '../../data/videos.json'
import tags from '../../data/tags.json'
import { useNavigate } from 'react-router'

const user = JSON.parse(localStorage.getItem('loggeduser') || '{}')

const getTagNames = (tagIds: string[]) =>
  tagIds.map(id => tags.find(t => t.id === id)?.name || id)

const teachingTags = getTagNames(user.wantsToTeach || [])
const learningTags = getTagNames(user.wantsToLearn || [])

const profileVideos = videos.filter(v => v.userId === user.id)

function Profile() {
  const navigate = useNavigate()  // ← adentro de la función

  return (
    <div className="profileLayout">
      <NavBar />
      <main className="profileMain">
        <ProfilePicture src={user.profilePicture} size="large" />
        <ProfileName name={user.username} username={user.at} />
        <div className="profileStats">
          <UserInfo label="Following" count={user.following} />
          <UserInfo label="Followers" count={user.followers} />
          <UserInfo label="Videos" count={user.videoCount} />
          <UserInfo label="Reputation" count={user.reputationAverage} />
        </div>
        <p className="profileBio">{user.bio ?? 'no bio yet.'}</p>
        <ProfileButton label="Edit profile" onClick={() => navigate('/EditProfile')} />
        <div className="profileTags">
          <TagsContainer title="TEACHING" tags={teachingTags} variant="teaching" />
          <TagsContainer title="LEARNING" tags={learningTags} variant="learning" />
        </div>
        <VideosContainer videos={profileVideos} />
      </main>
    </div>
  )
}

export default Profile