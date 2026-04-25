import { useState } from 'react'
import './possibleSwap.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'


function PossibleSwap() {

  return (
    <><div className='swapLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='swapContent'>
          <Header title='Swap?'></Header>   
          <div className='swapDecision'>
              <h2>Do you wanna Swap?</h2>
              <EntityCard photo='./src/assets/profile_picture.png' name="Carla Gonzales"></EntityCard>
              <EntityCard photo='./src/assets/profile_picture.png' name="Sofia Velez"></EntityCard>
              <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango"></EntityCard>
          </div>
      </div>
    </div>
    </>
  )
}

export default PossibleSwap