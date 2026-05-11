import { useState } from 'react'
import { useEffect } from 'react'
import './match.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import matches from '../../../data/matches.json'
import users from '../../../data/users.json'
import tags from '../../../data/tags.json'
import UploadVideoMatch from '../../../components/notifications/uploadVideoMatch/uploadVideoMatch'
import VideoScreen from '../../../components/create/videoScreen/videoScreen'
import { Navigate } from 'react-router-dom'
import InputGivy from '../../../components/inputGivy/inputGivy'
import Dropdown from '../../../components/create/dropDown/dropDown'
import BigButton from '../../../components/buttonsGivy/bigButton/bigButton'


function Match() {

    const loggedUserData = JSON.parse(localStorage.getItem('loggeduser') || '{}')
    const userLogged = loggedUserData.id

    if (!userLogged) {
        return <Navigate to="/login" />
    }

  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [filteredMatches, setFilteredMatches] = useState<typeof matches>([])
  const [likeVideo, setLikeVideo] = useState('')
  const [rating, setRating] = useState('')


  const likeOptions = [
    { id: 'yes', name: 'Yes' },
    { id: 'no', name: 'No' }
  ]

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
      const allMatches = stored ? JSON.parse(stored) : matches
      const userMatches = allMatches.filter((match) => match.user1Id === user || match.user2Id === user)
      setFilteredMatches(userMatches)
    } 

    getMatchesbyUser(userLogged);
  }, []);

  const currentMatch = filteredMatches.find(match => match.id === selectedMatch)
  const soyUser1 = currentMatch?.user1Id === userLogged
  const iSentVideo = soyUser1 ? currentMatch?.videoSentByUser1 : currentMatch?.videoSentByUser2
  const otherSentVideo = soyUser1 ? currentMatch?.videoSentByUser2 : currentMatch?.videoSentByUser1

  function getMatchVideo() {
    const stored = localStorage.getItem('matchVideos')
    const allVideos = stored ? JSON.parse(stored) : []
    return allVideos.find(v => v.matchId === selectedMatch && v.userId !== userLogged)
  }

  const otherUserVideo = getMatchVideo()

  function handleUploadVideo(file: File) {
    if (!selectedMatch) return

    const videoUrl = URL.createObjectURL(file)

    const storedVideos = localStorage.getItem('matchVideos')
    const allVideos = storedVideos ? JSON.parse(storedVideos) : []
    const newVideo = {
      matchId: selectedMatch,
      userId: userLogged,
      videoUrl: videoUrl,
      uploadDate: new Date().toISOString()
    }
    localStorage.setItem('matchVideos', JSON.stringify([...allVideos, newVideo]))

    const storedMatches = localStorage.getItem('matches')
    const allMatches = storedMatches ? JSON.parse(storedMatches) : matches

    const updatedMatches = allMatches.map(m => {
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

  return (
    <>
      <div className='matchLayout'>
        <div>
          <NavBar />
        </div>
        <div className='matchContent'>
          <Header title='Match' />   
          <div className='matchSectionsContainer'>
            <div className='match'>
              <h2 className='matchTitle'>Active Matches</h2>

              {filteredMatches.length === 0 ? (
                <h3>You don't have any matches</h3>
              ) : (
                filteredMatches.map((match, key) => {
                  const otherUserId = userLogged === match.user1Id ? match.user2Id : match.user1Id
                  const otherUser = users.find(u => u.id === otherUserId)
                  const tagOffered = tags.find(tag => tag.id === match.tagOffered)
                  const tagRequested = tags.find(tag => tag.id === match.tagRequested)
                  const noStarted = !match.videoSentByUser1 && !match.videoSentByUser2
                  const otherHasSent = soyUser1 ? match.videoSentByUser2 : match.videoSentByUser1

                  return (
                    <div key={key} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                      <EntityCard
                        onClick={() => setSelectedMatch(match.id)}
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

            <div className='divider' />

            <div className='chatSection'>
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

                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
                      <h2>Your match sent you a video!</h2>
                      {otherUserVideo ? (
                          <video
                              src={otherUserVideo.videoUrl}
                              controls
                              style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', backgroundColor: '#f5f5f5' }}
                          />
                      ) : (
                          <p>Loading video...</p>
                      )}

                      <div style={{ width: '100%', maxWidth: '500px', textAlign: 'left', marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                          <Dropdown
                              label="Did you like the educative Video?"
                              options={likeOptions}
                              value={likeVideo}
                              onChange={setLikeVideo}
                          />

                          <InputGivy
                              label={`Rate ${currentMatch ? users.find(u => u.id !== userLogged && (u.id === currentMatch.user1Id || u.id === currentMatch.user2Id))?.username : 'User'} (1-10)`}
                              type="number"
                              value={rating}
                              placeholder="Type here"
                              onChange={e => setRating(e.target.value)}
                          />

                          <BigButton content="SEND" onClick={handleSubmitRating} />
                      </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Match;