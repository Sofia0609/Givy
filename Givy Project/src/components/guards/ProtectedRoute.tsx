import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useAppSelector } from '../../store/hooks'
import { supabase } from '../../lib/supabase'
import LoadingScreen from './LoadingScreen'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppSelector(state => state.user)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      setChecking(false)
    })
  }, [])

  if (checking) return <LoadingScreen />
  if (!currentUser) return <Navigate to="/Login" />

  return <>{children}</>
}

export default ProtectedRoute