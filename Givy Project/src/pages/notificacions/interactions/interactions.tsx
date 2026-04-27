import { useState } from 'react'
import './interactons.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'


function Interactions() {

  return (
    <><div className='interactionsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='interactionsContent'>
          <Header title='Interactions'></Header>    
          <div className='interactionsSectionContainer'>
            <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango" description='Liked your video'></EntityCard>
            <EntityCard photo='./src/assets/profile_picture.png' name="Sofia Velez" description='Answered your comment'  button='Answer'></EntityCard>
            <EntityCard photo='./src/assets/profile_picture.png' name="Carla Gonzales" description='Commented on your video'  button='Answer'></EntityCard>
          </div>    
      </div>
    </div>
    </>
  )
}

export default Interactions;