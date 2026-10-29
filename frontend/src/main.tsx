import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { authConfig } from './configs/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider 
      clientId={authConfig.googleClientId}
      locale="en"
      >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
