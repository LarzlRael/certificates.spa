/* import ToolTip from '../boxex/ToolTip' */

import { isValidArray } from '@/utils/validation/validation'

import { processUrlImage } from '../../utils/processData'
/* import { DefaultBtn, RenderButton } from '../Buttons/' */

import { TableHeaderI } from './interfaces/table-interfaces'
import { convertDate } from '@/utils/dates'
import { Button } from '@/components/ui/button'
interface DataTypeProps {
  [key: string]: any
  a: TableHeaderI
}

const DataType = ({ a, head, reload }: DataTypeProps) => {
  switch (a.type) {
    case 'action':
      return (
        <Button
        /* fontSize="1.4rem"
          fontWeight="500"
          background="#e2e4f3"
          color="var(--colorPrimary)"
          width="auto"
          border="1px solid var(--blue)" */
        /* onClick={() => a.action!(head)} */
        >
          {a.textBtn}
        </Button>
      )
    case 'img':
      return <img src={head[a.key]} alt="avatar" />
    case 'a':
      if (head[a.key] === 'N/A') {
        return <div>{head[a.key]}</div>
      } else {
        return (
          <a href={head[a.key]} target="_blank" rel="noopener noreferrer">
            Abrir Archivo
          </a>
        )
      }
    case 'textColor':
      return (
        <div className="TableDefault__textColor">
          <h4
            style={{
              background: `${a.color![head[a.key]]}`,
              color: a.color![head[a.key]] ? '' : 'var(--black)',
            }}
          >
            {head[a.key]}
          </h4>
        </div>
      )
    case 'date':
      return (
        <div>
          {head[a.key]
            ? convertDate(
                head[a.key],
                a.dateFormatter ?? 'LLL',
              )?.toLocaleString()
            : '--'}
        </div>
      )
    case 'ReactNode':
      return (
        <div>
          {a.children}
        </div>
      )
    case 'actions':
      return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'start' }}>
          {isValidArray(a.actions!) &&
            a.actions!.map((item, i) => (
              <Button
                /* background="var(--secondary-color)" */
                onClick={() => item.action(head)}
              >
                {item.icon}
              </Button>
            ))}
        </div>
      )
    case 'textArea':
      if (head[a.key]) {
        return (
          <div>
            {head[a.key].substring(0, 100) +
              `${head[a.key].length > 100 ? '...' : ''} `}
          </div>
        )
      } else {
        return <div>--</div>
      }
    case 'list':
      if (head[a.key]) {
        const list = head[a.key].split('; ')

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
      if (head[a.key]) {
        const list = head[a.key]

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
      return <div>{head[a.key] ? head[a.key] : '--'}</div>
  }
}

export default DataType
