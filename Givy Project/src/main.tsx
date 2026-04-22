import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Feed from './pages/feed/Feed'
import {  createBrowserRouter, RouterProvider } from 'react-router'


let routes = createBrowserRouter([{
  path: "/",
  element: <Feed></Feed>
}],)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
