import { useState } from 'react'
import './notifications.css'
import NavBar from '../../components/navBar/navBar'
import Banner from '../../components/notifications/banner/banner'
import Header from '../../components/header/header'
import Section from '../../components/notifications/section/section'


function Notifications() {

  return (
    <><div className='notificationsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='notificationsContent'>
          <Header title="Notification Center"></Header>
          <Banner title="In this sections you can see your Interactions Posibles Swaps, and Matches!"></Banner>

          <div className='sectionsContainer'>
            <Section img = "./src/assets/possible_swap_icon.svg" title='Swap?' gradient='linear-gradient(to bottom, var(--color-purple-light) 30%, var(--color-brand-coral)' to='/possibleSwap'></Section>
            <Section img = "./src/assets/match_icon.svg" title='Match' gradient='linear-gradient(to bottom, var(--color-purple-light) 30%, var(--color-purple-active)' to='/match'></Section>
            <Section img = "./src/assets/interactions_icon.svg" title='Interactions'  gradient='linear-gradient(to bottom, var(--color-purple-light) 30%, var(--color-brand-teal)' to='/interactions'></Section>
          </div>
          
      </div>
    </div>
    </>
  )
}

export default Notifications