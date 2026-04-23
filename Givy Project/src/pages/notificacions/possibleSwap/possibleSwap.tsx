import { useState } from 'react'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'


function PossibleSwap() {

  return (
    <><div className='notificationsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='notificationsContent'>
          <Header title='Swap?'></Header>        
      </div>
    </div>
    </>
  )
}

export default PossibleSwap