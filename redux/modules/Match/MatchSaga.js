import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  MATCH_ACCEPT,
  MATCH_DECLINE,
  MATCH_REPORT,
  MATCH_BLOCK,
  FETCH_USERS,
  FETCH_MATCHES,
  fetchMatches,
  fetchMatchesSuccess,
  fetchMatchesFail,
  matchAcceptSuccess,
  matchDeclineSuccess,
  matchReportSuccess,
  matchBlockSuccess,
  fetchUsersSuccess,
  fetchUsersFail
} from './MatchReducer'
import { get, post, setupToken } from '../../../utils/requests'
import NavigatorService from '../../../utils/NavigatorService'

// ENDPOINTS

// const FETCH_USERS_ENDPOINT = '/api/protected/search'
const FETCH_USERS_ENDPOINT = (categories, city) => `api/protected/search?${categories.map((v) => `categories[]=${v}&`).join('')}${city ? 'city=' + city : ''}`
// const FETCH_USERS_ENDPOINT = `/api/protected/search`
const FETCH_MATCHES_ENDPOINT = '/api/protected/matches'
const ACCEPT_ENDPOINT = userId => `/api/protected/search/${userId}/accept`
const DECLINE_ENDPOINT = userId => `/api/protected/search/${userId}/decline`
const REPORT_ENDPOINT = userId => `/api/protected/search/${userId}/report`
const BLOCK_ENDPOINT = userId => `/api/protected/search/${userId}/block`

// SAGAS

const fetchUsersSaga = function* () {
  try {
    const profile = yield select(state => state.user.profile)
    setupToken(profile.token)
    // const { city, activities} = yield select(state => state.match.searchParams)
    const { data } = yield get(FETCH_USERS_ENDPOINT(profile.activities, profile.facebookLocation))
    yield put(fetchUsersSuccess(data.data))
    // NavigatorService.navigate('SearchCards')
  } catch (error) {
    yield put(fetchUsersFail(error))
    console.error(error)
  }
}

const fetchMatchesSaga = function* () {
  try {
    const token = yield select(state => state.user.profile.token)
    setupToken(token)
    const { data } = yield get(FETCH_MATCHES_ENDPOINT)
    yield put(fetchMatchesSuccess(data.data))
  } catch (error) {
    yield put(fetchMatchesFail(error))
    console.error(error)
  }
}

const matchAcceptSaga = function* (action) {
  try {
    const token = yield select(state => state.user.profile.token)
    setupToken(token)

    const { data } = yield post(ACCEPT_ENDPOINT(action.payload))
    yield put(matchAcceptSuccess(data.data))
    // yield put(fetchMatches())
  } catch (error) {
    console.error(error)
  }
}

const matchDeclineSaga = function* (action) {
  try {
    const token = yield select(state => state.user.profile.token)
    setupToken(token)

    const { data } = yield post(DECLINE_ENDPOINT(action.payload))
    yield put(matchDeclineSuccess(data.data))
  } catch (error) {
    console.error(error)
  }
}

const matchBlockSaga = function* (action) {
  try {
    const token = yield select(state => state.user.profile.token)
    setupToken(token)

    const { data } = yield post(BLOCK_ENDPOINT(action.payload))
    yield put(matchBlockSuccess(data.data))
  } catch (error) {
    console.error(error)
  }
}

const matchReportSaga = function* (action) {
  try {
    const token = yield select(state => state.user.profile.token)
    setupToken(token)

    const { data } = yield post(REPORT_ENDPOINT(action.payload))
    yield put(matchReportSuccess(data.data))
  } catch (error) {
    console.error(error)
  }
}

const matchSaga = function* () {
  yield all([
    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(FETCH_MATCHES, fetchMatchesSaga),
    takeLatest(MATCH_ACCEPT, matchAcceptSaga),
    takeLatest(MATCH_DECLINE, matchDeclineSaga),
    takeLatest(MATCH_BLOCK, matchBlockSaga),
    takeLatest(MATCH_REPORT, matchReportSaga),
  ])
}

export default matchSaga
