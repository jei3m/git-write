import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Router.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark} from '@clerk/themes'
import { ThemeProvider, useTheme } from './contexts/ThemeProvider.tsx'
import { Toaster } from "@/components/ui/sonner.tsx"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function Root() {
  const { theme } = useTheme()
  
  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
      }}
    >
      <App />
      <Toaster richColors position="bottom-right" theme='light' />
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </StrictMode>,
)