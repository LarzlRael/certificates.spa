import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'

const initialValues = {
  username: 'gatomon',
  password: 'gatomon',
}
export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    login(initialValues.username, initialValues.password).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={initialValues.username} />
        <input type="password" value={initialValues.password} />
        <button type="submit">Ingresar</button>
        {isLoading && <p>Cargando...</p>}
      </form>
    </div>
  )
}
