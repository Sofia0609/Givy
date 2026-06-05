import { Navigate } from 'react-router'
import { useAppSelector } from '../../store/hooks'
interface Props {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {
  const { currentUser } = useAppSelector(state => state.user)

  if (!currentUser) {
    return <Navigate to="/Login" />
  }

  return <>{children}</>
}

export default ProtectedRoute