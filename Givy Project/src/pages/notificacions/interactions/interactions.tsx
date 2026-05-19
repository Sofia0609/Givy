import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './interactons.css'
import notificationsData from '../../../data/notifications.json'
import usersData from '../../../data/users.json'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import { Navigate } from 'react-router-dom'
import type { Notification, User } from '../../../types/index'

interface InteractionWithUser extends Notification {
  fromUser?: User
  description: string
}

function Interactions() {

  const loggedUserData = JSON.parse(localStorage.getItem('loggeduser') || '{}')
  const userLogged = loggedUserData.id
  const navigate = useNavigate()

  if (!userLogged) {
    return <Navigate to="/login" />
  }

  const [myInteractions, setMyInteractions] = useState<InteractionWithUser[]>([])

  useEffect(() => {
    function getInteractionsbyUser(user: string) {
      const stored = localStorage.getItem('notifications')
      const allInteractions: Notification[] = stored ? JSON.parse(stored) : (notificationsData as Notification[])

      const userInteractions: InteractionWithUser[] = allInteractions
        .filter((interaction) => interaction.targetUserId === user)
        .map((interaction) => {
          // Busca quién generó la notificación
          const fromUser = (usersData as User[]).find(u => u.id === interaction.fromUserId)

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
  }, [userLogged]);

  function handleInteractionClick(interaction: InteractionWithUser) {
    // Navega al video donde ocurrió la interacción
    navigate(`/feed/${interaction.videoId}`)
  }

  return (
    <div className='interactionsLayout'>
      <div>
        <NavBar />
      </div>
      <div className='interactionsContent'>
        <Header title='Interactions' />    
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
                onClick={() => handleInteractionClick(interaction)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Interactions;