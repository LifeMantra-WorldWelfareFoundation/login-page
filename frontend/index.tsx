import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage'
import './styles/index.css' // Import your global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
)
