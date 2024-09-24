import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='820281909693-rvdgol20peoqotcn6td5fe9f2h47hbgr.apps.googleusercontent.com'>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>,
)
