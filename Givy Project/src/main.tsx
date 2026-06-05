import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import Feed from './pages/feed/Feed'
import Notifications from './pages/notificacions/Notifications'
import Search from './pages/search/Search'
import Profile from './pages/profile/Profile'
import Create from './pages/create/Create'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import PossibleSwap from './pages/notificacions/possibleSwap/possibleSwap'
import Match from './pages/notificacions/match/match'
import Interactions from './pages/notificacions/interactions/interactions'
import SignUp from './pages/signup/signUp/SignUp'
import LearnTags from './pages/signup/LearnTags/LearnTags'
import TeachTags from './pages/signup/TeachTags/TeachTags'
import Login from './pages/login/login'
import SearchResults from './pages/SearchResults/SearchResults'
import EditProfile from './pages/profile/EditProfile'
import ProfileView from './pages/profile/ProfileView'
import ProtectedRoute from './components/guards/ProtectedRoute'
import { setUser } from './store/userSlice'
import { supabase } from './lib/supabase'
import { getUserById } from './services/userService'
import { useAppDispatch } from './store/hooks'


function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await getUserById(session.user.id)
        dispatch(setUser(profile))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await getUserById(session.user.id)
        dispatch(setUser(profile))
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch])

  return <>{children}</>
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Feed",
    element: <ProtectedRoute><Feed /></ProtectedRoute>
  },
  {
    path: "/Feed/:videoId",
    element: <ProtectedRoute><Feed /></ProtectedRoute>
  },
  {
    path: "/Search",
    element: <ProtectedRoute><Search /></ProtectedRoute>
  },
  {
    path: "/Notifications",
    element: <ProtectedRoute><Notifications /></ProtectedRoute>
  },
  {
    path: "/Profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: "/Create",
    element: <ProtectedRoute><Create /></ProtectedRoute>
  },
  {
    path: '/PossibleSwap',
    element: <ProtectedRoute><PossibleSwap /></ProtectedRoute>
  },
  {
    path: '/Match',
    element: <ProtectedRoute><Match /></ProtectedRoute>
  },
  {
    path: "/match/:matchId",
    element: <ProtectedRoute><Match /></ProtectedRoute>
  },
  {
    path: '/Interactions',
    element: <ProtectedRoute><Interactions /></ProtectedRoute>
  },
  {
    path: '/SignUp',
    element: <SignUp />
  },
  {
    path: '/LearnTags',
    element: <LearnTags />
  },
  {
    path: '/TeachTags',
    element: <TeachTags />
  },
  {
    path: '/Search/Results',
    element: <ProtectedRoute><SearchResults /></ProtectedRoute>
  },
  {
    path: "/Profile/:userId",
    element: <ProtectedRoute><ProfileView /></ProtectedRoute>
  },
  {
    path: "/EditProfile",
    element: <ProtectedRoute><EditProfile /></ProtectedRoute>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthListener>
        <RouterProvider router={routes} />
      </AuthListener>
    </Provider>
  </StrictMode>,
)