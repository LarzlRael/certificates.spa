import { useSearchParams } from 'react-router-dom'

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams()

  // Obtenemos el parámetro 'token'
  const token = searchParams.get('token')
  if (token) {
    window.localStorage.setItem('token', token)
  }

  return (
    <div>
      <h1>Token: {token}</h1>
    </div>
  )
}
