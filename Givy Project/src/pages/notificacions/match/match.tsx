import { useState, useEffect, useRef } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import './match.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import matchesData from '../../../data/matches.json'
import usersData from '../../../data/users.json'
import tagsData from '../../../data/tags.json'
import UploadVideoMatch from '../../../components/notifications/uploadVideoMatch/uploadVideoMatch'
import InputGivy from '../../../components/inputGivy/inputGivy'
import Dropdown from '../../../components/create/dropDown/dropDown'
import MediumButton from '../../../components/buttonsGivy/mediumButtons/mediumButton'
import type { Match, User, Tag, MatchVideo } from '../../../types/index'

function Match() {

  const loggedUserData = JSON.parse(localStorage.getItem('loggeduser') || '{}')
  const userLogged = loggedUserData.id
  const navigate = useNavigate()
  const { matchId } = useParams<{ matchId?: string }>()

  if (!userLogged) {
    return <Navigate to="/login" />
  }

  const [selectedMatch, setSelectedMatch] = useState<string | null>(matchId || null)
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [likeVideo, setLikeVideo] = useState('')
  const [rating, setRating] = useState('')

  const likeOptions = [
    { id: 'yes', name: 'Yes' },
    { id: 'no', name: 'No' }
  ]

  const currentMatch: Match | undefined = filteredMatches.find(m => m.id === selectedMatch)

  function getMatchVideo(): MatchVideo | undefined {
    const stored = localStorage.getItem('matchVideos')
    const allVideos: MatchVideo[] = stored ? JSON.parse(stored) : []
    return allVideos.find(v => v.matchId === selectedMatch && v.userId !== userLogged)
  }

  const otherUserVideo: MatchVideo | undefined = getMatchVideo()

  function handleSubmitRating() {
    if (!likeVideo || !rating) {
      alert('Please complete all fields')
      return
    }
    alert('Rating submitted!')
    setLikeVideo('')
    setRating('')
  }

  useEffect(() => {
    function getMatchesbyUser(user: string) {
      const stored = localStorage.getItem('matches')
      const allMatches: Match[] = stored ? JSON.parse(stored) : (matchesData as Match[])
      const userMatches = allMatches.filter((match) => match.user1Id === user || match.user2Id === user)
      setFilteredMatches(userMatches)
    } 

    getMatchesbyUser(userLogged);
  }, [userLogged]);

  const soyUser1 = currentMatch?.user1Id === userLogged
  const iSentVideo = soyUser1 ? currentMatch?.videoSentByUser1 : currentMatch?.videoSentByUser2
  const otherSentVideo = soyUser1 ? currentMatch?.videoSentByUser2 : currentMatch?.videoSentByUser1

  function handleUploadVideo(file: File) {
    if (!selectedMatch) return

    const videoUrl = URL.createObjectURL(file)

    const storedVideos = localStorage.getItem('matchVideos')
    const allVideos: MatchVideo[] = storedVideos ? JSON.parse(storedVideos) : []
    const newVideo: MatchVideo = {
      matchId: selectedMatch,
      userId: userLogged,
      videoUrl: videoUrl,
      uploadDate: new Date().toISOString()
    }
    localStorage.setItem('matchVideos', JSON.stringify([...allVideos, newVideo]))

    const storedMatches = localStorage.getItem('matches')
    const allMatches: Match[] = storedMatches ? JSON.parse(storedMatches) : (matchesData as Match[])

    const updatedMatches: Match[] = allMatches.map(m => {
      if (m.id === selectedMatch) {
        return {
          ...m,
          videoSentByUser1: soyUser1 ? true : m.videoSentByUser1,
          videoSentByUser2: !soyUser1 ? true : m.videoSentByUser2,
        }
      }
      return m
    })
    localStorage.setItem('matches', JSON.stringify(updatedMatches))
    setFilteredMatches(updatedMatches.filter(m => m.user1Id === userLogged || m.user2Id === userLogged))
  }

  function handleSelectMatch(id: string) {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      navigate(`/match/${id}`)
    }
    setSelectedMatch(id)
  }

  function handleBackToList() {
    navigate('/match')
    setSelectedMatch(null)
  }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    const showOnlyChat = matchId && isMobile

  return (
    <>
      <div className='matchLayout'>
        <div>
          <NavBar />
        </div>
        <div className='matchContent'>
          <Header title='Match' />   
          <div className='matchSectionsContainer'>
            {/* LISTA DE MATCHES - Se oculta en mobile si hay matchId */}
            {!showOnlyChat && (
              <div className='match'>
                <h2 className='matchTitle'>Active Matches</h2>

                {filteredMatches.length === 0 ? (
                  <h3>You don't have any matches</h3>
                ) : (
                  filteredMatches.map((match, key) => {
                    const otherUserId = userLogged === match.user1Id ? match.user2Id : match.user1Id
                    const otherUser = (usersData as User[]).find(u => u.id === otherUserId)
                    const tagOffered = (tagsData as Tag[]).find(tag => tag.id === match.tagOffered)
                    const tagRequested = (tagsData as Tag[]).find(tag => tag.id === match.tagRequested)
                    const noStarted = !match.videoSentByUser1 && !match.videoSentByUser2
                    const otherHasSent = soyUser1 ? match.videoSentByUser2 : match.videoSentByUser1

                    return (
                      <div key={key} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
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
                            position: 'absolute',
                            top: '10px',
                            right: '20px',
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#ff4444',
                            borderRadius: '50%'
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
                {/* Botón volver en mobile */}
                {showOnlyChat && (
                  <button 
                    onClick={handleBackToList}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      marginBottom: '10px'
                    }}
                  >
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
                    <h2>{currentMatch ? (usersData as User[]).find(u => u.id !== userLogged && (u.id === currentMatch.user1Id || u.id === currentMatch.user2Id))?.username : 'User'} just Dropped a Video!</h2>
                    {otherUserVideo ? (
                      <video
                        src={otherUserVideo.videoUrl}
                        controls
                      />
                    ) : (
                      <p>Loading video...</p>
                    )}

                    <div className='surveySection'>
                      <p>Did you like the educative Video?</p>
                      <Dropdown
                        label=""
                        options={likeOptions}
                        value={likeVideo}
                        onChange={setLikeVideo}
                      />

                      <p>Rate {currentMatch ? (usersData as User[]).find(u => u.id !== userLogged && (u.id === currentMatch.user1Id || u.id === currentMatch.user2Id))?.username : 'User'} (1-10)</p>
                      <InputGivy
                        label=""
                        type="number"
                        value={rating}
                        placeholder="Type here"
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) {
                            setRating(value)
                          }
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
    </>
  )
}

export default Match;