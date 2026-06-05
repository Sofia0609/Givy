import { useState, useEffect } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import './match.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import UploadVideoMatch from '../../../components/notifications/uploadVideoMatch/uploadVideoMatch'
import InputGivy from '../../../components/inputGivy/inputGivy'
import Dropdown from '../../../components/create/dropDown/dropDown'
import MediumButton from '../../../components/buttonsGivy/mediumButtons/mediumButton'
import { supabase } from '../../../lib/supabase'
import tagsData from '../../../data/tags.json'

function Match() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const navigate = useNavigate()
  const { matchId } = useParams<{ matchId?: string }>()

  const [selectedMatch, setSelectedMatch] = useState<string | null>(matchId || null)
  const [filteredMatches, setFilteredMatches] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [likeVideo, setLikeVideo] = useState('')
  const [rating, setRating] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const likeOptions = [
    { id: 'yes', name: 'Yes' },
    { id: 'no', name: 'No' }
  ]

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!currentUser) return

    async function loadData() {
      // Traer usuarios
      const { data: usersData } = await supabase.from('users').select('*')
      if (usersData) setUsers(usersData)

      // Traer matches del usuario
      const { data: matchesData } = await supabase
        .from('matches')
        .select('*')
        .or(`userId.eq.${currentUser!.id},user2Id.eq.${currentUser!.id}`)
      if (matchesData) setFilteredMatches(matchesData)
    }

    loadData()
  }, [currentUser])

  if (!currentUser) return <Navigate to="/Login" />

  const currentMatch = filteredMatches.find(m => m.id === selectedMatch)
  const soyUser1 = currentMatch?.userId === currentUser.id
  const iSentVideo = soyUser1 ? currentMatch?.videoSentByUser1 : currentMatch?.videoSentByUser2
  const otherSentVideo = soyUser1 ? currentMatch?.videoSentByUser2 : currentMatch?.videoSentByUser1
  const otherVideoUrl = soyUser1 ? currentMatch?.videoIdUser2 : currentMatch?.videoIdUser1

  async function handleUploadVideo(file: File) {
    if (!selectedMatch || !currentUser) return

    // Subir video a Supabase Storage
    const fileName = `${currentUser.id}_${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(fileName, file)

    if (uploadError) {
      alert('Error uploading video: ' + uploadError.message)
      return
    }

    const { data: urlData } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName)

    const videoUrl = urlData.publicUrl

    // Actualizar match en Supabase
    const updateFields = soyUser1
      ? { videoSentByUser1: true, videoIdUser1: videoUrl }
      : { videoSentByUser2: true, videoIdUser2: videoUrl }

    await supabase
      .from('matches')
      .update(updateFields)
      .eq('id', selectedMatch)

    // Actualizar estado local
    setFilteredMatches(prev =>
      prev.map(m => m.id === selectedMatch ? { ...m, ...updateFields } : m)
    )
  }

  function handleSubmitRating() {
    if (!likeVideo || !rating) {
      alert('Please complete all fields')
      return
    }
    alert('Rating submitted!')
    setLikeVideo('')
    setRating('')
  }

  function handleSelectMatch(id: string) {
    if (isMobile) navigate(`/match/${id}`)
    setSelectedMatch(id)
  }

  function handleBackToList() {
    navigate('/Match')
    setSelectedMatch(null)
  }

  const showOnlyChat = matchId && isMobile

  return (
    <div className='matchLayout'>
      <div><NavBar /></div>
      <div className='matchContent'>
        <Header title='Match' />
        <div className='matchSectionsContainer'>

          {!showOnlyChat && (
            <div className='match'>
              <h2 className='matchTitle'>Active Matches</h2>
              {filteredMatches.length === 0 ? (
                <h3>You don't have any matches</h3>
              ) : (
                filteredMatches.map((match) => {
                  const otherUserId = currentUser.id === match.userId ? match.user2Id : match.userId
                  const otherUser = users.find(u => u.id === otherUserId)
                  const tagOffered = tagsData.find(tag => tag.id === match.tagOffered)
                  const tagRequested = tagsData.find(tag => tag.id === match.tagRequested)
                  const noStarted = !match.videoSentByUser1 && !match.videoSentByUser2
                  const isUser1 = currentUser.id === match.userId
                  const otherHasSent = isUser1 ? match.videoSentByUser2 : match.videoSentByUser1

                  return (
                    <div key={match.id} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                      <EntityCard
                        onClick={() => handleSelectMatch(match.id)}
                        photo={otherUser?.profilePicture}
                        name={otherUser?.username}
                        content={tagOffered?.name}
                        content2={tagRequested?.name}
                        button={noStarted ? 'Begin' : undefined}
                      />
                      {otherHasSent && !noStarted && (
                        <div style={{
                          position: 'absolute', top: '10px', right: '20px',
                          width: '16px', height: '16px',
                          backgroundColor: '#ff4444', borderRadius: '50%'
                        }} />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          )}

          {!showOnlyChat && <div className='divider' />}

          {(selectedMatch !== null || showOnlyChat) && (
            <div className='chatSection'>
              {showOnlyChat && (
                <button onClick={handleBackToList}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '10px' }}>
                  ← Volver
                </button>
              )}

              {selectedMatch === null ? (
                <h2 className='noMatchSelected'>What do you want to learn today?</h2>

              ) : !iSentVideo ? (
                <UploadVideoMatch
                  tittle='Upload your educative video!'
                  description={otherSentVideo
                    ? 'Your match already sent their video, send yours to watch it!'
                    : 'This way you can receive the educate video from your Match!'}
                  icon='./src/assets/upload_icon.svg'
                  onVideoSelect={handleUploadVideo}
                />

              ) : !otherSentVideo ? (
                <UploadVideoMatch
                  tittle='Congratulations!'
                  description='Video Uploaded! Wait till your Match sends their Video'
                  icon='./src/assets/uploaded_icon.svg'
                  disabled={true}
                />

              ) : (
                <div className='videoContainer'>
                  <h2>{users.find(u => {
                    const otherId = currentUser.id === currentMatch?.userId ? currentMatch?.user2Id : currentMatch?.userId
                    return u.id === otherId
                  })?.username} just Dropped a Video!</h2>

                  {otherVideoUrl ? (
                    <video src={otherVideoUrl} controls />
                  ) : (
                    <p>Loading video...</p>
                  )}

                  <div className='surveySection'>
                    <p>Did you like the educative Video?</p>
                    <Dropdown label="" options={likeOptions} value={likeVideo} onChange={setLikeVideo} />
                    <p>Rate (1-10)</p>
                    <InputGivy label="" type="number" value={rating} placeholder="Type here"
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) setRating(value)
                      }}
                    />
                    <MediumButton content="SEND" onClick={handleSubmitRating} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Match