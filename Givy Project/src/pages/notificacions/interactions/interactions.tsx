import { useState } from 'react'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'


function Interactions() {

  return (
    <><div className='notificationsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='notificationsContent'>
          <Header title='Interactions'></Header>    
          <div className='entityCardContainer'>
            <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango" ></EntityCard>
          </div>    
      </div>
    </div>
    </>
  )
}

export default Interactions;