import HttpClient from '../HttpClient'
export const postAction = (url: string, body: any) => {
  return new Promise((resolve) => {
    HttpClient.post({
      url: url,
      data: body,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error)
        resolve(error.response)
      })
  })
}
export const postEmptyAction = (url: string, body: any) => {
  return new Promise((resolve) => {
    HttpClient.postEmpty({
      url: url,
      data: body,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
export const putAction = (url: string, body: any) => {
  return new Promise((resolve) => {
    HttpClient.put({
      url: url,
      data: body,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}

export const getAction = (url: string) => {
  return new Promise((resolve) => {
    HttpClient.get({
      url,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}

export const deleteAction = (url: string) => {
  return new Promise((resolve) => {
    HttpClient.delete({
      url,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
