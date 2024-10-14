/* import ToolTip from '../boxex/ToolTip' */

import { isValidArray } from '@/utils/validation/validation'


/* import { DefaultBtn, RenderButton } from '../Buttons/' */

import { TableHeaderI } from './interfaces/table-interfaces'
import { convertDate } from '@/utils/dates'
import { Button } from '@/components/ui/button'
interface DataTypeProps<T> {
  [key: string]: any
  columnData: TableHeaderI<T>
}

const DataType = <T extends object>({ columnData, head }: DataTypeProps<T>) => {
  /* console.log('DataType', a)
  console.log('Header', head) */

  switch (columnData.type) {
    case 'action':
      return (
        <Button
        /* fontSize="1.4rem"
          fontWeight="500"
          background="#e2e4f3"
          color="var(--colorPrimary)"
          width="auto"
          border="1px solid var(--blue)" */
        /* onClick={() => columnData.action!(head)} */
        >
          {columnData.textBtn}
        </Button>
      )
    case 'img':
      return <img src={head[columnData.key]} alt="avatar" />
    case 'a':
      if (head[columnData.key] === 'N/A') {
        return <div>{head[columnData.key]}</div>
      } else {
        return (
          <a href={head[columnData.key]} target="_blank" rel="noopener noreferrer">
            Abrir Archivo
          </a>
        )
      }
    case 'textColor':
      return (
        <div className="TableDefault__textColor">
          <h4
            style={{
              background: `${columnData.color![head[columnData.key]]}`,
              color: columnData.color![head[columnData.key]] ? '' : 'var(--black)',
            }}
          >
            {head[columnData.key]}
          </h4>
        </div>
      )
    case 'date':
      return (
        <div>
          {head[columnData.key]
            ? convertDate(
                head[columnData.key],
                columnData.dateFormatter ?? 'LLL',
              )?.toLocaleString()
            : '--'}
        </div>
      )
    case 'ReactNode':
      return <div>{columnData.childrenAction ? columnData.childrenAction(head) : '--'}</div>
    case 'actions':
      return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'start' }}>
          {isValidArray(columnData.actions!) &&
            columnData.actions!.map((item, i) => (
              <Button
                key={i}
                /* background="var(--secondary-color)" */
                onClick={() => item.action(head)}
              >
                {item.icon}
              </Button>
            ))}
        </div>
      )
    case 'textArea':
      if (head[columnData.key]) {
        return (
          <div>
            {head[columnData.key].substring(0, 100) +
              `${head[columnData.key].length > 100 ? '...' : ''} `}
          </div>
        )
      } else {
        return <div>--</div>
      }
    case 'list':
      if (head[columnData.key]) {
        const list = head[columnData.key].split('; ')

        return (
          <div>
            {list.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  marginBottom: '5px',
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '2px 5px',
                }} 
              >
                {item}
              </div>
            ))}
          </div>
        )
      } else {
        return <div>--</div>
      }
    /* case 'stringArray':
      if (head[columnData.key]) {
        const list = head[columnData.key]

        return (
          <div>
            {list.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '5px',
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '2px 5px',
                }}
              >
                {rolName[item]}
              </div>
            ))}
          </div>
        )
      } else {
        return <div>--</div>
      } */
    default:
      return <div>{head[columnData.key] ? head[columnData.key] : '--'}</div>
  }
}

export default DataType
