import './App.css'
import { useThemeStore } from './store/themeStore'
import { Main } from './router/Main'

function App() {
  /* const darkModeState = useThemeStore((state) => state) */

  return <Main />
}

export default App
