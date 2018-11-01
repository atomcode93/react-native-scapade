import _ from 'lodash'
import { Permissions, Notifications } from 'expo';
import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { BASE_URL } from '../../../utils/requests'

import { put as putRequest, setupToken } from '../../../utils/requests'

const SEND_NOTIFICATION = 'system/SEND_NOTIFICATION';
const SEND_NOTIFICATION_SUCCESS = 'system/SEND_NOTIFICATION_SUCCESS';
const SEND_NOTIFICATION_FAIL = 'system/SEND_NOTIFICATION_FAIL';

const NOTIFICATION_ENDPOINT = '/api/protected/users/push';

const initialState = {
  isLoading: false
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SEND_NOTIFICATION:
      return {
        ...state,
        isLoading: true
      }

    case SEND_NOTIFICATION_SUCCESS:
          return {
            ...state,
            isLoading: false
          }
 
    case SEND_NOTIFICATION_FAIL:
          return {
            ...state,
            isLoading: false
          }

    default:
      return state;
  }
};

export const sendNotification = () => ({type: SEND_NOTIFICATION});

const sendNotificationSaga = function* () {
  try {
    const tokenFacebook = yield select(state => state.user.profile.token)
    setupToken(tokenFacebook)

    const { status: existingStatus } = yield call(Permissions.getAsync, Permissions.NOTIFICATIONS)

    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = yield call(Permissions.askAsync, Permissions.NOTIFICATIONS)
      finalStatus = status

      let token = yield call(Notifications.getExpoPushTokenAsync)
      const { data: payload } = yield putRequest('/api/protected/users/push', { token })
    }
    
    yield put({type: SEND_NOTIFICATION_SUCCESS, payload});
  } catch (error) {
    console.log(error);
    yield put({type: SEND_NOTIFICATION_FAIL, error});
  }
};

export const systemSaga = function*() {
  yield all([
    takeLatest(SEND_NOTIFICATION, sendNotificationSaga),
  ])
}
