import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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


let routes = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/login" />  
  },
  {
    path: "/Feed",
    element: <Feed />
  },
  {

    path: "/Feed/:videoId",
    element: <Feed />
  },
  {
    path: "/Search",
    element: <Search />
  },
  {
    path: "/Notifications",
    element: <Notifications />
  },
  {
    path: "/Profile",
    element: <Profile />
  },
  {
    path: "/Create",
    element: <Create />
  },
  {
    path: '/PossibleSwap',
    element: <PossibleSwap />
  },
  {
    path: '/Match',
    element: <Match />
  },
  {
    path: "/match/:matchId",
    element: <Match />
  },
  {
    path: '/Interactions',
    element: <Interactions />
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
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Search/Results',
    element: <SearchResults />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)


