import { createRoot } from 'react-dom/client'
import axios from 'axios'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
  ,
)
