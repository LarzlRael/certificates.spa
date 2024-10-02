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
