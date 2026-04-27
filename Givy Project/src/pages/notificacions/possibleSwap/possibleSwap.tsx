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
          <div className='swapSectionsContainer'>
            <div className='swap'>
                <h2 className='swapTitle'>Do you wanna Swap?</h2>
                <EntityCard photo='./src/assets/profile_picture.png' name="Carla Gonzales" content='art' content2='developer' desicionButtons = {true}></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Sofia Velez" content='math' content2='music' desicionButtons = {true}></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango"  content='dance' content2='art' desicionButtons = {true}></EntityCard>
            </div>
            <div className='swap'>
                <h2 className='swapTitle'>Match Status</h2>
                <EntityCard photo='./src/assets/profile_picture.png' name="Carla Gonzales"  content='music' content2='desing'></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Sofia Velez"  content='teatre' content2='fotografy'></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango"  content='writting' content2='singing'></EntityCard>
          </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default PossibleSwap