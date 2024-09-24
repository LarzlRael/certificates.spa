import axios, { AxiosRequestConfig } from 'axios'
const instancia = axios.create()

/* instancia.CancelToken = axios.CancelToken
instancia.isCancel = axios.isCancel */
export const getAction = (url: string) => {
  return new Promise((resolve) => {
    instancia
      .get(url)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
export const postAction = async <T>(
  url: string,
  body: Record<string, any>, // Usamos Record para describir un objeto clave-valor de manera más flexible
): Promise<{ status: number; data?: T; error?: any }> => {
  try {
    const response = await instancia.post(url, body)
    return {
      status: response.status,
      data: response.data as T, // Aseguramos que los datos devueltos sean del tipo genérico T
    }
  } catch (error) {
    console.error('Error in postAction:', error.response || error)

    return {
      status: error.response?.status || 500, // Manejo de errores en la respuesta HTTP
      error: error.response?.data || 'An error occurred', // Devolvemos el mensaje de error si está disponible
    }
  }
}

export const putAction = (axiosRequestConfig: AxiosRequestConfig) => {
  return new Promise((resolve) => {
    instancia
      .put(axiosRequestConfig.url!, axiosRequestConfig.data)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
