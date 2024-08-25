import moment from 'moment'
import 'moment/locale/es'

export function convertD(dateConv: Date | string, formatDate: string) {
  if (dateConv) {
    if (formatDate === 'LLLL') {
      const date = moment(dateConv, 'YYYY-MM-DDTHH:mm:ss').format('LL')
      const hour = moment(dateConv, 'YYYY-MM-DDTHH:mm:ss').format('LT')
      return date + ' a horas ' + hour
    } else if (formatDate === 'utc') {
      if (dateConv === '0001-01-01T00:00:00') {
        return null
      } else {
        return new Date(dateConv)
      }
    } else {
      return moment(dateConv, 'YYYY-MM-DDTHH:mm:ss').format(formatDate)
    }
  }
  return null
}
