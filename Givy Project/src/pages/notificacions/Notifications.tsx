import { useState } from 'react'
import NavBar from '../../components/navBar/navBar'
import Banner from '../../components/notifications/banner/banner'


function Notifications() {

  return (
    <><div className='notificationsLayout'>
      <NavBar></NavBar>
      <Banner title="In this sections you can see your Interactions Posibles Swaps, and Matches!"></Banner>
    </div>
    </>
  )
}

export default Notifications