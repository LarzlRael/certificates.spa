import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { useInformationStore } from '@/store/useInformationStore'

export const AlertDialogInformation = () => {
  const { alertDialogContent } = useInformationStore()
  const { changeAlertDialogInformation } = useInformationStore()
  const {
    content,
    isAlertDialogOpen,
    subtitle,
    title,
    confirmText,
    cancelText,
    onCancel,
    onConfirm,
  } = alertDialogContent

  return (
    <AlertDialog
      open={isAlertDialogOpen}
      onOpenChange={() => {
        changeAlertDialogInformation({
          isAlertDialogOpen: false,
          content: undefined,
          title: '',
          subtitle: '',
          onConfirm: undefined,
          onCancel: undefined,
          confirmText: '',
          cancelText: '',
        })
      }}
    >
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content ?? subtitle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (onCancel) {
                onCancel()
              }
            }}
          >
            {cancelText || 'Cancelar'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (onConfirm) {
                onConfirm()
              }
            }}
          >
            {confirmText || 'Aceptar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
