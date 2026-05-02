import { useState } from 'react'
import { useEffect } from 'react'
import './match.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import UploadVideo from '../../../components/create/uploadVideo/uploadVideo'
import BigButton from '../../../components/bigButton/bigButton'
import matches from '../../../data/matches.json'
import users from '../../../data/users.json'
import tags from '../../../data/tags.json'
import UploadVideoMatch from '../../../components/notifications/uploadVideoMatch/uploadVideoMatch'

function Match() {

  const userLogged = "u5"

  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [filteredMatches, setFilteredMatches] = useState<typeof matches>([])
  const [filteredUser,setUser] = useState<any>({})

  useEffect(() => {
  
    function getUserbyID(id:string){
      const user = users.find((user)=> user.id === id)
      setUser(user)
      console.log(user)
    }

    function getMatchesbyUser(user:string){

      const stored = localStorage.getItem('matches')
      const allMatches = stored ? JSON.parse(stored) : matches
      const userMatches = allMatches.filter((match)=> match.user1Id === user || match.user2Id === user)
      setFilteredMatches(userMatches)
    } 

    getUserbyID(userLogged);
    getMatchesbyUser(userLogged);
  }, []);

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
                ) : (
                    <UploadVideoMatch
                        tittle='Upload a video to start the chat'
                        description='This way you can receive the educate video from your Match!'
                        icon='./src/assets/upload_icon.svg'
                    />
                )}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Match;