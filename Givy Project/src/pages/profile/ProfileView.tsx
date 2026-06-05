import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import type { User } from '../../types/index'
import { supabase } from '../../lib/supabase'
import NavBar from '../../components/navBar/navBar'
import ProfilePicture from '../../components/profile/ProfilePicture/ProfilePicture'
import ProfileName from '../../components/profile/ProfileName/ProfileName'
import UserInfo from '../../components/profile/UserInfo/UserInfo'
import TagsContainer from '../../components/profile/TagsContainer/TagsContainer'
import VideosContainer from '../../components/profile/VideosContainer/VideosContainer'
import tags from '../../data/tags.json'
import './ProfileStyle.css'

const getTagNames = (tagIds: string[]) =>
    tagIds.map(id => tags.find(t => t.id === id)?.name || id)

function ProfileView() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const [viewedUser, setViewedUser] = useState<User | null>(null)
    const [videos, setVideos] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return

        // Si es tu propio perfil, redirige
        if (userId === currentUser?.id) {
            navigate('/Profile')
            return
        }

        // Traer usuario
        supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single()
            .then(({ data }) => {
                if (data) setViewedUser(data as User)
                setLoading(false)
            })

        // Traer sus videos
        supabase
            .from('videos')
            .select('*')
            .eq('user_id', userId)
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
    }, [userId])

    if (loading) return <p>Loading...</p>

    if (!viewedUser) return (
        <div className="profileLayout">
            <NavBar />
            <main className="profileMain">
                <p>User not found</p>
            </main>
        </div>
    )

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
                    <UserInfo label="Reputation" count={viewedUser.reputation} />
                </div>
                <p className="profileBio">{viewedUser.bio || 'no bio yet.'}</p>
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