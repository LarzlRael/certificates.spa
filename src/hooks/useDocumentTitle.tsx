import { useEffect } from 'react'
import { capitalizeString } from '../utils/utils'

export const useDocumentTitle = (titleDocument: string) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = capitalizeString(titleDocument)
    return () => {
      document.title = prevTitle
    }
  }, [titleDocument])
}
