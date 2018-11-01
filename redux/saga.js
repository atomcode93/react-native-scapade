import { all } from 'redux-saga/effects'
import { userSaga } from './modules/User'
import { matchSaga } from './modules/Match'
import { startStopChannel } from './modules/Chat'
import { systemSaga } from './modules/System'

const rootSaga = function* rootSaga() {
  yield all([
    userSaga(),
    matchSaga(),
    startStopChannel(),
    systemSaga()
  ])
}
export default rootSaga
