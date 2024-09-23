import './App.css'
import { useThemeStore } from './store/store'
import { Main } from './router/Main'

function App() {
  const darkModeState = useThemeStore((state) => state)
  /*   const currentAmount = useThemeStore((state) => state.currentAmount)
  const increase = useThemeStore((state) => state.increment5Amount) */

  console.log(darkModeState)
  return <Main />
}

export default App
