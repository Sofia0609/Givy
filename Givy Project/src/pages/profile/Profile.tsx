import { useState } from 'react'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import ProfileButton from '../../components/buttonGivy/ProfileButton/buttonGivy'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import './Profile.css'

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
        <ProfileName name="Your Name" username="yourname0" />
        <div className="profileStats">
          <UserInfo label="Following" count={30} />
          <UserInfo label="Followers" count={126} />
          <UserInfo label="Videos" count={3} />
          <UserInfo label="Reputation" count={8.6} />
        </div>
        <p className="profileBio">{bio ?? 'no bio yet.'}</p>
        <ProfileButton label="Edit profile" />
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