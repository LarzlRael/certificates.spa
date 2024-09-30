export interface TableHeaderI <T>{
  key: keyof T
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
  childrenAction?: (element: T) => React.ReactNode
}
export interface actionInterface {
  labelTooltip: string
  action: (id: any) => void
  icon: React.ReactNode
  textBtn?: string
}
