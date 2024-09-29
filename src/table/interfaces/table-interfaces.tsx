export interface TableHeaderI {
  key: string
  name: string
  type?:
    | 'img'
    | 'date'
    | 'actions'
    | 'a'
    | 'textColor'
    | 'textArea'
    | 'list'
    | 'action'
    | 'actions'
    | 'ReactNode'
  color?: string
  textBtn?: string
  actions?: actionInterface[]
  action?: actionInterface
  dateFormatter?: string
  children?: React.ReactNode
}
export interface actionInterface {
  labelTooltip: string
  action: (id: any) => void
  icon: React.ReactNode
  textBtn?: string
}
