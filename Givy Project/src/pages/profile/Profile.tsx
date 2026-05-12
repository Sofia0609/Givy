import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import ProfileButton from '../../components/buttonGivy/ProfileButton/buttonGivy'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import './ProfileStyles.css'
import videos from '../../data/videos.json'
import tags from '../../data/tags.json'
import reputations from '../../data/reputations.json'

const getTagNames = (tagIds: string[]) =>
  tagIds.map(id => tags.find(t => t.id === id)?.name || id)

function Profile() {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('loggeduser') || '{}')

    const storedReps = localStorage.getItem('reputations')
    const allReps = storedReps ? JSON.parse(storedReps) : reputations

    const myRatings = allReps
      .filter((r: typeof reputations[0]) => r.toUserId === stored.id)
      .map((r: typeof reputations[0]) => r.rating)

    const average = myRatings.length > 0
      ? parseFloat((myRatings.reduce((a: number, b: number) => a + b, 0) / myRatings.length).toFixed(1))
      : 0

    return { ...stored, reputationAverage: average }
  })

  const teachingTags = getTagNames(user.wantsToTeach || [])
  const learningTags = getTagNames(user.wantsToLearn || [])

  const profileVideos = videos.filter((v) => v.userId === user.id)

  function handleAddTeaching(tag: string) {
    const updated = {
      ...user,
      wantsToTeach: [...(user.wantsToTeach || []), tag],
    }
    setUser(updated)
    localStorage.setItem('loggeduser', JSON.stringify(updated))
  }

  function handleAddLearning(tag: string) {
    const updated = {
      ...user,
      wantsToLearn: [...(user.wantsToLearn || []), tag],
    }
    setUser(updated)
    localStorage.setItem('loggeduser', JSON.stringify(updated))
  }

  function handleRemoveTeaching(tag: string) {
    const updated = {
      ...user,
      wantsToTeach: (user.wantsToTeach || []).filter((t: string) => t !== tag),
    }
    setUser(updated)
    localStorage.setItem('loggeduser', JSON.stringify(updated))
  }

  function handleRemoveLearning(tag: string) {
    const updated = {
      ...user,
      wantsToLearn: (user.wantsToLearn || []).filter((t: string) => t !== tag),
    }
    setUser(updated)
    localStorage.setItem('loggeduser', JSON.stringify(updated))
  }

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
        <VideosContainer videos={profileVideos} />
      </main>
    </div>
  )
}

export default Profile