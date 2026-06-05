import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import './interactons.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import { supabase } from '../../../lib/supabase'
import { Navigate } from 'react-router'

function Interactions() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const navigate = useNavigate()
  const [myInteractions, setMyInteractions] = useState<any[]>([])

  useEffect(() => {
    if (!currentUser) return

    async function loadInteractions() {
      // Traer notificaciones del usuario
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('targetUserId', currentUser!.id)
        .order('created_at', { ascending: false })

      if (!notifications) return

      // Traer usuarios para mostrar quién generó la notificación
      const { data: users } = await supabase.from('users').select('*')

      const withDetails = notifications.map(n => {
        const fromUser = users?.find(u => u.id === n.fromUserId)

        let description = ''
        if (n.type === 'like') description = 'Liked your video'
        if (n.type === 'comment') description = 'Commented on your video'
        if (n.type === 'reply') description = 'Replied to your comment'

        return { ...n, fromUser, description }
      })

      setMyInteractions(withDetails)
    }

    loadInteractions()
  }, [currentUser])

  if (!currentUser) return <Navigate to="/Login" />

  function handleInteractionClick(interaction: any) {
    navigate(`/Feed/${interaction.videoId}`)
  }

  return (
    <div className='interactionsLayout'>
      <div><NavBar /></div>
      <div className='interactionsContent'>
        <Header title='Interactions' />
        <div className='interactionsSectionContainer'>
          {myInteractions.length === 0 ? (
            <h3>You don't have any interactions yet</h3>
          ) : (
            myInteractions.map((interaction) => (
              <EntityCard
                key={interaction.id}
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

export default Interactions