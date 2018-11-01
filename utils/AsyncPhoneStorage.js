import { AsyncStorage } from 'react-native'

const toJS = jsonString => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return jsonString
  }
}

export default {
  getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      })
    })
  },
  setItem(key, value) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value, error => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })
  },
  removeItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key, error => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })
  }
}
