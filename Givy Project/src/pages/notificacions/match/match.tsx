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
import VideoScreen from '../../../components/notifications/videoScreen/videoScreen'

function Match() {

  const userLogged = "u5"

  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [filteredMatches, setFilteredMatches] = useState<typeof matches>([])

  useEffect(() => {

    function getMatchesbyUser(user:string){

      const stored = localStorage.getItem('matches')
      const allMatches = stored ? JSON.parse(stored) : matches
      const userMatches = allMatches.filter((match)=> match.user1Id === user || match.user2Id === user)
      setFilteredMatches(userMatches)
    } 

    getMatchesbyUser(userLogged);
  }, []);

  const currentMatch = filteredMatches.find(match => match.id === selectedMatch)
  const myUserId1 = currentMatch?.user1Id === userLogged ? currentMatch.user1Id : currentMatch?.user2Id
  const iSentVideo = myUserId1? currentMatch?.videoSentByUser1 : currentMatch?.videoSentByUser2
  const otherSentVideo = myUserId1 ? currentMatch?.videoSentByUser2 : currentMatch?.videoSentByUser1

  return (
    <>
    <div className='matchLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='matchContent'>
          <Header title='Match'></Header>   
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

                        if (userLogged === match.user1Id || userLogged === match.user2Id) {

                          return (
                            <EntityCard
                                onClick={() => setSelectedMatch(match.id)}
                                key={key}
                                photo={otherUser?.profilePicture}
                                name={otherUser?.username}
                                content={tagOffered?.name}
                                content2={tagRequested?.name}
                                button={noStarted ? 'Begin' : undefined} 
                            />
                        )

                      }

                    })
                )}
            </div>

            <div className='divider'></div>

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
                    />

                ) : !otherSentVideo ? (
     
                    <UploadVideoMatch
                        tittle='Congratulations!'
                        description='Video Uploaded! Wait till your Match sends their Video'
                        icon='./src/assets/uploaded_icon.svg'
                    />

                ) : (
                    <div>
                        <VideoScreen icon='./src/assets/play_video_button.svg'/>
                    </div>
                )
                }

              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Match;