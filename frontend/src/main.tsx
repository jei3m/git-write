import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Router.tsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from './contexts/ThemeProvider.tsx'
import { Toaster } from "@/components/ui/sonner.tsx"

function Root() {
  const domain = import.meta.env.VITE_AUTH_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;


  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <App />
      <Toaster richColors position="bottom-right" theme='light' expand={true} />
      
    </Auth0Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </StrictMode>,
)