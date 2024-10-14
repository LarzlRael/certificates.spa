import { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { useQuery } from '@tanstack/react-query'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const instance = axios.create()

const useAxiosQuery = <T extends object>(axiosParams: AxiosRequestConfig) => {
  const [header, setheader] = useState<any>()

  const { isLoading, isFetching, error, refetch, data } = useQuery({
    queryKey: ['name'],
    queryFn: () => instance.request(axiosParams),
    staleTime: 1000 * 60,
  })

  return {
    data,
    error,
    loading: isLoading,
    isFetching,
    reload: refetch,
    header,
  }
}
export default useAxiosQuery
