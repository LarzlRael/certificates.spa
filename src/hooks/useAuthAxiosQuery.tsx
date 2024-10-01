import axios, { AxiosRequestConfig } from 'axios'
import { useQuery } from '@tanstack/react-query'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

axios.interceptors.request.use(
  (config) => {
    const jwtToken = window.localStorage.getItem('token')
    if (jwtToken) {
      config.headers!.Authorization = `Bearer ${jwtToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const useAxiosQueryAuth = <T = unknown,>(axiosParams: AxiosRequestConfig) => {
  const { url, method, ...restParams } = axiosParams

  const queryKey = [url, method, restParams]
  const queryFn = async (): Promise<T> => {
    if (!url) throw new Error('URL is required for axios request')
    const response = await axios.request<T>(axiosParams)
    return response.data
  }

  const { isLoading, isFetching, error, refetch, data } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 1000 * 60,
  })

  return {
    data,
    error,
    isLoading,
    isFetching,
    reload: refetch,
    queryKey,
  }
}

export const useAxiosMultiQueryAuth = <T extends unknown[]>(
  axiosParamsArray: AxiosRequestConfig[],
) => {
  const queries = axiosParamsArray.map((axiosParams) => {
    const { url, method, ...restParams } = axiosParams

    const queryKey = [url, method, restParams]
    const queryFn = async (): Promise<any> => {
      if (!url) throw new Error('URL is required for axios request')
      const response = await axios.request<any>(axiosParams)
      return response.data
    }

    return {
      queryKey,
      queryFn,
    }
  })

  // Función que se ejecuta para hacer todas las llamadas
  const multiQueryFn = async (): Promise<T> => {
    const responses = await Promise.all(queries.map((q) => q.queryFn()))
    return responses as T // Cast como el array de tipos genéricos
  }

  const { isLoading, isFetching, error, refetch, data } = useQuery({
    queryKey: queries.map((q) => q.queryKey),
    queryFn: multiQueryFn,
    staleTime: 1000 * 60,
  })

  // Devolvemos un array de objetos con las propiedades de cada petición
  return queries.map((query, index) => ({
    data: data ? data[index] : undefined, // Datos específicos de cada petición
    isLoading,
    isFetching,
    error,
    reload: refetch, // Recargar todas las peticiones
  }))
}

export default useAxiosQueryAuth
