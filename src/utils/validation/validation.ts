export const isValidArray = (dataArray: any[] | undefined): boolean => {
  return Array.isArray(dataArray) && dataArray.length > 0
}

export const validateStatus = (statusCode: number): boolean => {
  const status = [200, 201, 202, 203, 204]
  return status.includes(statusCode)
}

export const isValidString = (str?: string | unknown): boolean => {
  return typeof str === 'string' && str.length > 0
}
