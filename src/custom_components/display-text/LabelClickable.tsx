interface LabelClickableProps {
  text: string
  onClick: () => void
  className?: string
}

interface LabelTitleSubtitleClickableProps extends LabelClickableProps {
  subtitle?: string 
  direction?: 'row' | 'column'
  spacer?: string
}

export const LabelClickable = (props: LabelClickableProps) => {
  const { text, onClick, className } = props
  const styleClasses = className
    ? className
    : 'font-semibold text-primary hover:text-primary-500 text-right cursor-pointer'
  return (
    <div className="text-sm" onClick={onClick}>
      <label className={styleClasses}>{text}</label>
    </div>
  )
}

export const LabelTitleSubTitleClickable = (props: LabelTitleSubtitleClickableProps) => {
  const { text, subtitle, onClick, className, direction = 'column', spacer = '' } = props

  const styleClasses = className
    ? className
    : 'font-semibold text-primary hover:text-primary-500 text-right'

  // Clases de flexbox para dirección row o column
  const directionClasses = direction === 'row' ? 'flex-row' : 'flex-col'

  return (
    <div className={`flex items-center cursor-pointer ${directionClasses} ${spacer} text-sm`} onClick={onClick}>
      <label className="text-gray-500">{text}</label>
      <span className={styleClasses}>{subtitle}</span>
    </div>
  )
}