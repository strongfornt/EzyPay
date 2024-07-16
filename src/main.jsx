import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.jsx'
import ContextProvider from './ContextProvider/ContextProvider.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router} />
    <Toaster />
    </ContextProvider>
  </React.StrictMode>,
)
