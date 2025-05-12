import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Router.tsx'
import { ThemeProvider } from './contexts/ThemeProvider.tsx'
import { Toaster } from "@/components/ui/sonner.tsx"
import { AuthProvider } from './contexts/FirebaseContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster richColors position="bottom-right" theme='light' expand={true} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)