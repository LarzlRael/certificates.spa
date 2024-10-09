import './App.css'
import { useThemeStore } from './store/useThemeStore'
import { Main } from './router/Main'
import { AuthWrapper } from './components/auth/AuthWrapper'

function App() {
  /* const darkModeState = useThemeStore((state) => state) */
  return (
    <AuthWrapper>
      <Main />
    </AuthWrapper>
  )
}

export default App
