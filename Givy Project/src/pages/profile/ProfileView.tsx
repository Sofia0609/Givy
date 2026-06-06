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
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                        className="profileFollowBtn"
                        onClick={async () => {
                            if (!currentUser || !viewedUser) return
                            await supabase.from('users').update({ following: currentUser.following + 1 }).eq('id', currentUser.id)
                            await supabase.from('users').update({ followers: viewedUser.followers + 1 }).eq('id', viewedUser.id)
                            setViewedUser({ ...viewedUser, followers: viewedUser.followers + 1 })
                        }}
                    >
                        Follow
                    </button>
                    <button
                        className="profileFollowBtn"
                        onClick={async () => {
                            if (!currentUser || !viewedUser) return
                            const { data: existing } = await supabase
                                .from('swapRequests')
                                .select('id')
                                .eq('fromUserId', currentUser.id)
                                .eq('toUserId', viewedUser.id)
                                .eq('status', 'pending')
                            
                            if (existing && existing.length > 0) {
                                alert('You already sent a swap request!')
                                return
                            }

                            await supabase.from('swapRequests').insert({
                                id: crypto.randomUUID(),
                                fromUserId: currentUser.id,
                                toUserId: viewedUser.id,
                                status: 'pending',
                                tagOffered: currentUser.wantsToTeach?.[0] ?? '',
                                tagRequested: viewedUser.wantsToTeach?.[0] ?? ''
                            })
                            alert('Swap request sent!')
                        }}
                    >
                        Swap
                    </button>
                </div>

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