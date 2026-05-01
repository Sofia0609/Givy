import { useState } from 'react'
import './match.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import UploadVideo from '../../../components/create/uploadVideo/uploadVideo'
import BigButton from '../../../components/bigButton/bigButton'
import UploadVideoMatch from '../../../components/notifications/uploadVideoMatch/uploadVideoMatch'


function Match() {

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
                <h2 className='matchTitle'>What do you wanna learn today?</h2>
                <EntityCard photo='./src/assets/profile_picture.png' name="Carla Gonzales" content='art' content2='developer' button='Begin'></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Sofia Velez" content='math' content2='music' button='Begin'></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango"  content='dance' content2='art' button='Begin'></EntityCard>
            </div>

            <div className='divider'></div>

            <div className='chatSection'>
                <UploadVideoMatch tittle='Upload a video to start the chat' description='This way you can receive the educate video from you Match!' icon='./src/assets/upload_icon.svg'></UploadVideoMatch>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Match;