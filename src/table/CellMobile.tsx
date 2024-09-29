import DataType from './DataType'

import { isValidArray } from '@/utils/validation/validation'
import { TableHeaderI } from './interfaces/table-interfaces'
interface CellMobileProps {
  [key: string]: any
  header: TableHeaderI[]
  id: number
}
const CellMobile = ({
  cell,
  id,
  HandleActivate,
  header,
  activate,
}: CellMobileProps) => {
  return (
    <>
      <div className="TableDefault__container">
        <div
          className={`TableDefault__cell ${
            activate === id ? 'TableDefault__cell-activate' : ''
          }`}
        >
          {isValidArray(header)
            ? header.map((a, i: number) => {
                return (
                  <div
                    onClick={
                      a.type === 'actions'
                        ? () => {}
                        : () => HandleActivate(id, cell)
                    }
                    className="TableDefault__column"
                    key={i}
                  >
                    <h2 className="TableDefault__head">{a.name}</h2>
                    <DataType a={a} key={i} head={cell} />
                  </div>
                )
              })
            : null}
        </div>
      </div>
      <hr />
    </>
  )
}

export default CellMobile
