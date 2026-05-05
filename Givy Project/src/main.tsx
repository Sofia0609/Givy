import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/login/login'
import Feed from './pages/feed/Feed'
import Notifications from './pages/notificacions/Notifications'
import Search from './pages/search/Search'
import Profile from './pages/profile/Profile'
import Create from './pages/create/Create'
import {  createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import PossibleSwap from './pages/notificacions/possibleSwap/possibleSwap'
import Match from './pages/notificacions/match/match'
import Interactions from './pages/notificacions/interactions/interactions'
import SearchResults from './pages/SearchResults/SearchResults'


let routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />  
  },
  {
  path: "/Login",
  element: <Login></Login>
  },
  {
  path: "/Feed",
  element: <Feed></Feed>
  },
    {
    path: "/Search",
    element: <Search></Search>
  },
  {
    path: "/Notifications",
    element: <Notifications></Notifications>
  },
  {
    path: "/Profile",
    element: <Profile></Profile>
  },
  {
    path: "/Create",
    element: <Create></Create>
  },
  { 
    path: '/PossibleSwap', 
    element: <PossibleSwap></PossibleSwap> 
  },
  {
    path:'/Match',
    element: <Match></Match>
  },
  {
    path: '/Interactions',
    element: <Interactions></Interactions>
  },
  {
    path: "/Search/Results",
    element: <SearchResults />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
