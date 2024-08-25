import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

axios.interceptors.request.use(
  (config) => {
    const securityToken = window.localStorage.getItem('token')
    if (securityToken) {
      config.headers!.Authorization = 'Bearer ' + securityToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const requestGeneric = {
  get: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.get(axiosRequestConfig.url!),
  post: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.post(axiosRequestConfig.url!, axiosRequestConfig.data),
  postEmpty: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.post(axiosRequestConfig.url!),
  put: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.put(axiosRequestConfig.url!, axiosRequestConfig.data),
  putEmpty: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.put(axiosRequestConfig.url!),
  delete: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.delete(axiosRequestConfig.url!),
}
export default requestGeneric
