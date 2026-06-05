import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store'
import { clearUser } from '../../store/userSlice'
import { logoutUser } from '../../services/authService'
import { supabase } from '../../lib/supabase'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import ProfileButton from '../../components/buttonsGivy/buttonGivy/buttonGivy'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import tags from '../../data/tags.json'
import './ProfileStyle.css'

const getTagNames = (tagIds: string[]) =>
    tagIds.map(id => tags.find(t => t.id === id)?.name || id)

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const [videos, setVideos] = useState<any[]>([])

    useEffect(() => {
        if (!currentUser) {
            navigate('/Login')
            return
        }

        // Traer videos del usuario desde Supabase
        supabase
            .from('videos')
            .select('*')
            .eq('user_id', currentUser.id)
            .then(({ data }) => {
                if (data) {
                    const mapped = data.map(v => ({
                        id: v.id,
                        url: v.URL,
                        userId: v.user_id,
                        matchId: v.match_id,
                        description: v.description,
                        likes: v.likes,
                        thumbnail: '',
                        title: '',
                        tags: [],
                        uploadDate: v.created_at,
                        teaches: [],
                        wantsToLearnInReturn: []
                    }))
                    setVideos(mapped)
                }
            })
    }, [currentUser])

    if (!currentUser) return null

    async function handleLogout() {
        const confirmed = window.confirm('Are you sure you want to log out?')
        if (!confirmed) return

        try {
            await logoutUser()
            dispatch(clearUser())
            navigate('/Login')
        } catch (error: any) {
            alert('Error: ' + error.message)
        }
    }

    const teachingTags = getTagNames(currentUser.wantsToTeach || [])
    const learningTags = getTagNames(currentUser.wantsToLearn || [])

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
                    <UserInfo label="Reputation" count={currentUser.reputation} />
                </div>
                <p className="profileBio">{currentUser.bio || 'no bio yet.'}</p>
                <ProfileButton label="Edit profile" onClick={() => navigate('/EditProfile')} />
                <div className="profileTags">
                    <TagsContainer
                        title="TEACHING"
                        tags={teachingTags}
                        variant="teaching"
                        options={tags}
                    />
                    <TagsContainer
                        title="LEARNING"
                        tags={learningTags}
                        variant="learning"
                        options={tags}
                    />
                </div>
                <VideosContainer videos={videos} />
            </main>
        </div>
    )
}

export default Profile