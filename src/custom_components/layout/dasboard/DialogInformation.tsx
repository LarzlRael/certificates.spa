import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useThemeStore } from '@/store/themeStore'

export const DialogInformation = () => {
  const { dialogContent } = useThemeStore()
  const { changeDialogInformation } = useThemeStore()

  return (
    <Dialog
      open={dialogContent.isDialogOpen}
      onOpenChange={() => {
        changeDialogInformation({
          isDialogOpen: false,
          content: undefined,
          title: '',
          subtitle: '',
        })
      }}
    >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Ver Perfil de Usuario</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogDescription>{dialogContent.subtitle}</DialogDescription>
        </DialogHeader>
        <Card className="w-full">{dialogContent.content}</Card>
      </DialogContent>
    </Dialog>
  )
}
