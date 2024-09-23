import { Button } from '@/components/ui/button'

export const HomePage = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('hola desde este nuevo boton')
        }}
      >
        Button
      </Button>
      <h2>que fue gente este el h1 del pa pagina we weee</h2>
    </div>
  )
}
