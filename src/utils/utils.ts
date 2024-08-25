export const capitalizeFirstLetter = (word: string = ''): string => {
  if (word.length === 0 || word === null || word === undefined) return ''
  return word.charAt(0).toUpperCase() + word.slice(1)
}
export const validateStatus = (status: any) => {
  const validateStatusCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208]
  return validateStatusCodes.includes(status)
}

export function processDrag(list: any[]) {
  let aux: { id: string; content: any }[] = []
  /* if (validateArray(list)) {
    list
      .sort((a, b) => a[order] - b[order])
      .forEach((element: any) => {
        aux.push({
          id: `${element[id]}`,
          content: element[content],
        })
      })
  } */
  /* console.log(list) */
  return list.map((element)=>{
    return {
      id: `${element.id}`,
      content: element.content,
    }
  })
  
}


export const getTimeNow = () => {
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${
    hours > 12 ? 'PM' : 'AM'
  }`
}