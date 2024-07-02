import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import MainPage from './pages/main/main-page'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  )
}

export default App
