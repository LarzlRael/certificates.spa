import './TableDefault.css'
import { useState } from 'react'

import DataType from './DataType'
import CellMobile from './CellMobile'

import { TableHeaderI } from './interfaces/table-interfaces'
import { isValidArray } from '@/utils/validation/validation'
import useSize from '@/hooks/useSize'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

interface TableMainProps {
  [key: string]: any
  header: TableHeaderI[]
  main: { [key: string]: any }[]
  handleInfo?: (us: any) => void
}

const TableMain = ({
  header,
  main,
  handleInfo,
  reload,
  keyOrder = '',
  borderBottom = false,
}: TableMainProps) => {
  const { target, currentSize } = useSize()

  const gridTable = {
    gridTemplate: `auto / repeat(${header.length}, 1fr)`,
  }
  const [activate, setactivate] = useState<number | null>(null)
  const limitSize = 425
  function HandleActivate(index: number, us: any) {
    setactivate(index)
    if (handleInfo) {
      handleInfo(us)
    }
  }
  /*  <h2 key={i} className="TableDefault__head">
                  {a.name}
                </h2> */
  function TableFordesk() {
    return (
      <>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {isValidArray(header)
                    ? header.map((a, i: number) => (
                        <TableHead>{a.name}</TableHead>
                      ))
                    : null}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isValidArray(main)
                  ? main
                      .sort((a, b: any) => a[keyOrder] - b[keyOrder])
                      .map((head: any, i: number) => (
                        <TableRow
                        /* key={i}
                          style={gridTable}
                          className={`TableDefault__cell ${
                            borderBottom
                              ? 'TableDefault__cell_borderBottom'
                              : ''
                          }${
                            activate === i ? 'TableDefault__cell-activate' : ''
                          }`} */
                        >
                          {isValidArray(header)
                            ? header.map((a, j: number) => (
                                <TableCell
                                  onClick={
                                    a.type === 'actions'
                                      ? () => {}
                                      : () => HandleActivate(i, head)
                                  }
                                  key={j}
                                >
                                  <DataType a={a} head={head} reload={reload} />
                                </TableCell>
                              ))
                            : null}
                        </TableRow>
                      ))
                  : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
    )
  }

  function TableForMobile() {
    return (
      <>
        {isValidArray(main)
          ? main.map((head, i: number) => {
              return (
                <CellMobile
                  key={i}
                  id={i}
                  cell={head}
                  header={header}
                  HandleActivate={HandleActivate}
                  activate={activate}
                />
              )
            })
          : null}
      </>
    )
  }

  return (
    <div ref={target} className="TableDefault">
      {currentSize.width ? (
        currentSize.width > limitSize ? (
          <TableFordesk />
        ) : (
          <TableForMobile />
        )
      ) : (
        <TableFordesk />
      )}
    </div>
  )
}
export default TableMain
