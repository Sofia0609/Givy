import { useEffect, useState } from 'react'
import './interactons.css'
import interactions from '../../../data/notifications.json'
import users from '../../../data/users.json'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'


function Interactions() {

  const userLogged = "u1"
  const [myInteractions, setMyInteractions] = useState<any[]>([])

  useEffect(() => {

  function getInteractionsbyUser(user: string) {
    const stored = localStorage.getItem('interactions')
    const allInteractions = stored ? JSON.parse(stored) : interactions

    const userInteractions = allInteractions
        .filter((interaction) => interaction.targetUserId === user)
        .map((interaction) => {
            // Busca quién generó la notificación
            const fromUser = users.find(u => u.id === interaction.fromUserId)

            // Arma el texto según el tipo
            let description = ''
            if (interaction.type === 'like') description = 'Liked your video'
            if (interaction.type === 'comment') description = 'Commented on your video' 
            if (interaction.type === 'reply') description = 'Replied to your comment'

            return { ...interaction, fromUser, description }
        })

    setMyInteractions(userInteractions)

  }

    getInteractionsbyUser(userLogged);
  }, []);
  

  return (
    <><div className='interactionsLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='interactionsContent'>
          <Header title='Interactions'></Header>    
          <div className='interactionsSectionContainer'>
                {myInteractions.length === 0 ? (
                    <h3>You don't have any interactions yet</h3>
                ) : (
                  myInteractions.map((interaction, key) => (
                    <EntityCard
                        key={key}
                        photo={interaction.fromUser?.profilePicture}
                        name={interaction.fromUser?.username}
                        description={interaction.description}
                        button={interaction.type !== 'like' ? 'Answer' : undefined}
                    />
                  ))
                )}
          </div>
    </div>
    </div>
    </>
  )
}

export default Interactions;