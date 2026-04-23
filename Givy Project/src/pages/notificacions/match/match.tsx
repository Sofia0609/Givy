import { useState } from 'react'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'


function Match() {

  return (
    <><div className='notificationsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='notificationsContent'>
          <Header title='Match'></Header>        
      </div>
    </div>
    </>
  )
}

export default Match