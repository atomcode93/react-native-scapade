import axios from 'axios'
import NavigatorService from '../utils/NavigatorService'

// const BASE_URL = 'http://95.213.204.108'
export const BASE_URL = 'http://45.55.95.161'
// export const BASE_URL = 'http://localhost:3000'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const request = axios.create()

export const setupToken = token => {
  request.defaults.headers.common.Authorization = token
}

export const resetToken = _ => {
  request.defaults.headers.common.Authorization = undefined
}

request.interceptors.request.use(
  request => {
    return request
  },
  error => {
    console.log(error)
  }
)

request.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      NavigatorService.navigate('InitialScreen')
    }
    return Promise.reject(error)
  }
)

export const post = (url, data, config = {}) => request.post(url, data, config)
export const get = (url, config = {}) => request.get(url, config)
export const put = (url, data, config = {}) => request.put(url, data, config)
export const del = (url, config = {}) => request.delete(url, config)
