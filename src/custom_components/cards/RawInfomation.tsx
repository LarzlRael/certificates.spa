import { Card } from '@/components/ui/card'
import { isValidString } from '@/utils/validation/validation'

interface PaymentInfoProps {
  label: string
  value: string | null | undefined
  icon: React.ReactNode
}
export const ContentRawInformation = ({ label, value, icon }: PaymentInfoProps) => {
  if (!isValidString(value)) return <div></div>
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )
}

interface InfoLabelProps {
  title: string
  value?: string | undefined | null
  child?: React.ReactNode
}

export const InfoLabelPresentationCard = ({ title, value, child }: InfoLabelProps) => {
  if (!isValidString(value)) {
    return <div></div>
  }

  return (
    <Card className="w-full mb-4 p-4">
      <div className="grid grid-cols-[150px_1fr] items-center gap-4">
        <h3 className="text-lg font-semibold truncate break-words whitespace-normal" title={title}>
          {title}
        </h3>
        <div className="min-w-0">
          {child ? child : <span className="font-normal">{value}</span>}
        </div>
      </div>
    </Card>
  )
}
