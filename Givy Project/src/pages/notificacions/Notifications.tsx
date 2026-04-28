import { useState } from 'react'
import './notifications.css'
import NavBar from '../../components/navBar/navBar'
import Banner from '../../components/notifications/banner/banner'
import Header from '../../components/header/header'


function Notifications() {

  return (
    <><div className='notificationsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='notificationsContent'>
          <Header title="Notification Center"></Header>
          <Banner title="In this56 sections you can see your Interactions Posibles Swaps, and Matches!"></Banner>
      </div>
    </div>
    </>
  )
}

export default Notifications