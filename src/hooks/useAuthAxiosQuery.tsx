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
  }
}

export default useAxiosQueryAuth
