import { all, take, takeLatest, call, put, select } from 'redux-saga/effects'
import { UPDATE, LOGIN, LOGOUT, LOAD_SESSION, loginSuccess, loginFail, loadSessionFail, updateSuccess } from './UserReducer'
import { fetchMatches } from '../Match'
import { startChannel, stopChannel } from '../Chat';
import { sendNotification } from '../System'

import { login } from '../../../utils/facebook'
import { post, put as putRequest, setupToken, resetToken } from '../../../utils/requests'
import AsyncPhoneStorage from '../../../utils/AsyncPhoneStorage'
import NavigatorService from '../../../utils/NavigatorService'

// ENDPOINTS

const LOGIN_ENDPOINT = '/api/users'
const UPDATE_PROFILE_ENDPOINT = (userId) => `/api/protected/users/${userId}`

// SAGAS

const loadSessionSaga = function*() {
  try {
    const token = yield AsyncPhoneStorage.getItem('@UserStore:token')
    // ok, here its can be null

    if (typeof token === 'string') {
      const { data } = yield post(LOGIN_ENDPOINT, { token })
      setupToken(data.data.token)
      yield put(loginSuccess(data.data))
      // additional requests initial
      yield put(fetchMatches())
      yield put(sendNotification())
      yield put(startChannel())
      NavigatorService.navigate('Profile')
    }
  } catch (error) {
    yield put(loadSessionFail(error))
    console.error(error)
  }
}

const loginSaga = function*() {
  try {
    // call facebook login
    const { type, token } = yield call(login)

    if (type === 'success') {
      yield AsyncPhoneStorage.setItem('@UserStore:token', token)
      const { data } = yield post(LOGIN_ENDPOINT, { token })
      setupToken(data.data.token)
      yield put(loginSuccess(data.data))
      yield put(startChannel())
      NavigatorService.navigate('Profile')
    }
  } catch (error) {
    yield put(loginFail(error))
    console.error(error)
  }
}

const updateProfileSaga = function*(action) {
  try {
    const userId = yield select(state => state.user.profile['_id'])
    const { data } = yield putRequest(UPDATE_PROFILE_ENDPOINT(userId), { ...action.payload })
    yield put(updateSuccess(data.data))
  } catch (error) {
    console.error(error)
  }
}

const logoutSaga = function*() {
  yield AsyncPhoneStorage.removeItem('@UserStore:token')
  resetToken()
  yield put(startChannel())
  NavigatorService.navigate('InitialScreen')
}

const userSaga = function*() {
  yield all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGOUT, logoutSaga),
    takeLatest(LOAD_SESSION, loadSessionSaga),
    takeLatest(UPDATE, updateProfileSaga)
  ])
}

export default userSaga
