import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Root from './Root'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  }
])

const users = [
  {
    username: 'whistler092',
    email: 'iamramiroo@gmail.com',
    effort: 1,
  },
  {
    username: 'Olena',
    email: 'email@epam.com',
    effort: 2,
  }
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
