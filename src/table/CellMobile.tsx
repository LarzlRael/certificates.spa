import DataType from './DataType'

import { isValidArray } from '@/utils/validation/validation'
import { TableHeaderI } from './interfaces/table-interfaces'
import { Card, CardContent } from '@/components/ui/card'
interface CellMobileProps<T> {
  [key: string]: any
  header: TableHeaderI<T>[]
  id: number
  handleActivate: (index: number, us: any) => void
  activate: number | null
}
const CellMobile = <T extends {}>({
  cell,
  id,
  handleActivate,
  header,
  activate,
}: CellMobileProps<T>) => {
  return (
    <Card className="my-3">
      <div
        className={`TableDefault__cell my ${
          activate === id ? 'TableDefault__cell-activate' : ''
        }`}
      >
        <CardContent>
          {isValidArray(header)
            ? header.map((a, i: number) => {
                return (
                  <div
                    onClick={
                      a.type === 'actions'
                        ? () => {}
                        : () => handleActivate(id, cell)
                    }
                    className="TableDefault__column"
                    key={i}
                  >
                    <h2 className="text-sm font-semibold">{a.name}</h2>
                    <DataType columnData={a} key={i} head={cell} />
                  </div>
                )
              })
            : null}
        </CardContent>
      </div>
    </Card>
  )
}

export default CellMobile
