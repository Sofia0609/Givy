import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import './Profile.css'

function Profile() {
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
      </main>

    </div>
  )
}

export default Profile