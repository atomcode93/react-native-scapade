import _ from 'lodash'
import { handleActions, createAction } from 'redux-actions'

// ---
// CONSTANTS
// ---
export const ADD_ACTIVITY = 'user/ADD_ACTIVITY'
export const REMOVE_ACTIVITY = 'user/REMOVE_ACTIVITY'
export const EDIT_BIO = 'user/EDIT_BIO'
export const EDIT_LOCATION = 'user/EDIT_LOCATION'
export const EDIT_AVATAR_URL = 'user/EDIT_AVATAR_URL'

export const LOGIN = 'user/LOGIN'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'user/LOGIN_FAIL'

export const UPDATE = 'user/UPDATE'
export const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS'

export const LOGOUT = 'user/LOGOUT'
export const FETCH_PROFILE = 'user/FETCH_PROFILE'
export const LOAD_SESSION = 'user/LOAD_SESSION'
export const LOAD_SESSION_FAIL = 'user/LOAD_SESSION_FAIL'

// ---
// ACTION CREATORS
// ---
export const addActivity = createAction(ADD_ACTIVITY)
export const removeActivity = createAction(REMOVE_ACTIVITY)
export const editBio = createAction(EDIT_BIO)
export const editLocation = createAction(EDIT_LOCATION)
export const editAvatarUrl = createAction(EDIT_AVATAR_URL)

export const login = createAction(LOGIN)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFail = createAction(LOGIN_FAIL)

export const logout = createAction(LOGOUT)
export const update = createAction(UPDATE)
export const updateSuccess = createAction(UPDATE_SUCCESS)
export const loadSession = createAction(LOAD_SESSION)
export const loadSessionFail = createAction(LOAD_SESSION_FAIL)

// ---
// INITIAL STATE
// ---
const initialState = {
  profile: {},
  appInitialized: false,
  isLoading: false
}

// ---
// REDUCER
// ---
export default handleActions(
  {
    [LOGIN]: (state, action) => ({
      ...state,
      isLoading: true
    }),

    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      profile: action.payload,
      isLoading: false
    }),

    [LOGIN_FAIL]: (state, action) => ({
      ...state,
      isLoading: false
    }),

    [LOAD_SESSION]: (state, action) => ({
      ...state,
      appInitialized: true,
      isLoading: true
    }),

    [LOAD_SESSION_FAIL]: (state, action) => ({
      ...state,
      appInitialized: false,
      isLoading: false
    }),

    [UPDATE_SUCCESS]: (state, action) => ({
      ...state,
      profile: {
        ...action.payload,
        token: state.profile.token || null
      }
    }),

    [LOGOUT]: (state, action) => ({ ...initialState }),

    [ADD_ACTIVITY]: (state, action) => ({
      ...state,
      profile: {
        ...state.profile,
        activities: _.concat(state.profile.activities, action.payload)
      }
    }),

    [REMOVE_ACTIVITY]: (state, action) => ({
      ...state,
      profile: {
        ...state.profile,
        activities: _.without(state.profile.activities, action.payload)
      }
    }),

    [EDIT_BIO]: (state, action) => ({
      ...state,
      profile: {
        ...state.profile,
        bio: action.payload
      }
    }),

    [EDIT_LOCATION]: (state, action) => ({
      ...state,
      profile: {
        ...state.profile,
        city: action.payload
      }
    }),

    [EDIT_AVATAR_URL]: (state, action) => ({
      ...state,
      profile: {
        ...state.profile,
        avatar: action.payload
      }
    })
  },
  initialState
)
