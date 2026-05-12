

import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import ProfileButton from '../../components/buttonGivy/ProfileButton/buttonGivy'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import './Profile.css'
import videos from '../../data/videos.json'


const userLogged = localStorage.getItem('loggeduser')
console.log(JSON.parse(userLogged));
const user = JSON.parse(userLogged || '{}')

const teachingTags = ['Web Development', 'UI/UX Design', 'JavaScript']
const learningTags = ['Guitar', 'Photography', 'Korean']



const profileVideos = [
  { id: 1, views: 1240 },
  { id: 2, views: 856 },
  { id: 3, views: 3421 },
]

function Profile() {
  const bio = null

  return (
    <div className="profileLayout">
      <NavBar />
      <main className="profileMain">
        <ProfilePicture src="https://placehold.co/150" size="large" />
        <ProfileName name={user.username} username={user.at} />
        <div className="profileStats">
          <UserInfo label="Following" count={user.following} />
          <UserInfo label="Followers" count={user.followers} />
          <UserInfo label="Videos" count={user.videoCount} />
          <UserInfo label="Reputation" count={user.reputationAverage} />
        </div>
        <p className="profileBio">{user.bio ?? 'no bio yet.'}</p>
        <ProfileButton label="Edit profile" />
        <div className="profileTags">
          <TagsContainer title="TEACHING" tags={teachingTags} variant="teaching" />
          <TagsContainer title="LEARNING" tags={learningTags} variant="learning" />
        </div>
        <VideosContainer videos={videos} />
      </main>
    </div>
  )
}

export default Profile