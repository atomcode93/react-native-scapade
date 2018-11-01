import { handleActions, createAction } from 'redux-actions'
import _ from 'lodash'

// ---
// CONSTANTS
// ---
export const FETCH_USERS = 'match/FETCH_USERS'
export const FETCH_USERS_SUCCESS = 'match/FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAIL = 'match/FETCH_USERS_FAIL'

export const FETCH_MATCHES = 'match/FETCH_MATCHES'
export const FETCH_MATCHES_SUCCESS = 'match/FETCH_MATCHES_SUCCESS'
export const FETCH_MATCHES_FAIL = 'match/FETCH_MATCHES_FAIL'

export const ADD_ACTIVITY = 'match/ADD_ACTIVITY'
export const REMOVE_ACTIVITY = 'match/REMOVE_ACTIVITY'
export const EDIT_LOCATION = 'match/EDIT_LOCATION'
export const CLEAR_SEARCH = 'match/CLEAR_SEARCH'

export const MATCH_ACCEPT = 'match/MATCH_ACCEPT'
export const MATCH_ACCEPT_SUCCESS = 'match/MATCH_ACCEPT_SUCCESS'

export const MATCH_DECLINE = 'match/MATCH_DECLINE'
export const MATCH_DECLINE_SUCCESS = 'match/MATCH_DECLINE_SUCCESS'

export const MATCH_BLOCK = 'match/MATCH_BLOCK'
export const MATCH_BLOCK_SUCCESS = 'match/MATCH_BLOCK_SUCCESS'

export const MATCH_REPORT = 'match/MATCH_REPORT'
export const MATCH_REPORT_SUCCESS = 'match/MATCH_REPORT_SUCCESS'
// ---
// ACTION CREATORS
// ---
export const fetchUsers = createAction(FETCH_USERS)
export const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS)
export const fetchUsersFail = createAction(FETCH_USERS_FAIL)

export const fetchMatches = createAction(FETCH_MATCHES)
export const fetchMatchesSuccess = createAction(FETCH_MATCHES_SUCCESS)
export const fetchMatchesFail = createAction(FETCH_MATCHES_FAIL)

export const addActivity = createAction(ADD_ACTIVITY)
export const removeActivity = createAction(REMOVE_ACTIVITY)
export const editLocation = createAction(EDIT_LOCATION)
export const clearSearch = createAction(CLEAR_SEARCH)

export const matchAccept = createAction(MATCH_ACCEPT)
export const matchAcceptSuccess = createAction(MATCH_ACCEPT_SUCCESS)

export const matchDecline = createAction(MATCH_DECLINE)
export const matchDeclineSuccess = createAction(MATCH_DECLINE_SUCCESS)

export const matchBlock = createAction(MATCH_BLOCK)
export const matchBlockSuccess = createAction(MATCH_BLOCK_SUCCESS)

export const matchReport = createAction(MATCH_REPORT)
export const matchReportSuccess = createAction(MATCH_REPORT_SUCCESS)

// ---
// INITIAL STATE
// ---
const initialState = {
  users: [],
  blockedUser: {},
  usersLoading: true,
  matches: [],
  matchResult: {},
  searchParams: {
    city: '',
    activities: []
  }
}

// ---
// REDUCER
// ---
export default handleActions(
  {
    [FETCH_USERS]: (state, action) => ({
      ...state,
      usersLoading: true
    }),

    [FETCH_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
      usersLoading: false
    }),

    [FETCH_USERS_FAIL]: (state, action) => ({
      ...state,
      usersLoading: false
    }),

    [FETCH_MATCHES_SUCCESS]: (state, action) => ({
      ...state,
      matches: action.payload
    }),

    [ADD_ACTIVITY]: (state, action) => ({
      ...state,
      searchParams: {
        ...state.searchParams,
        activities: _.concat(state.searchParams.activities, action.payload)
      }
    }),

    [REMOVE_ACTIVITY]: (state, action) => ({
      ...state,
      searchParams: {
        ...state.searchParams,
        activities: _.without(state.searchParams.activities, action.payload)
      }
    }),

    [EDIT_LOCATION]: (state, action) => ({
      ...state,
      searchParams: {
        ...state.searchParams,
        city: action.payload
      }
    }),
    
    [MATCH_DECLINE_SUCCESS]: (state, action) => ({
      ...state,
      users: _.remove(state.users, (user) => user._id !== action.payload.user._id)
    }),

    [MATCH_ACCEPT_SUCCESS]: (state, action) => ({
      ...state,
      matchResult: action.payload,
      users: _.remove(state.users, (user) => user._id !== action.payload.user._id),
      blockedUser: {}
    }),
    [MATCH_BLOCK_SUCCESS]: (state, action) => ({
      ...state,
      users: _.remove(state.users, (user) => user._id !== action.payload.user._id),
      matchResult: {},
      blockedUser: action.payload.user
    }),
    [MATCH_REPORT_SUCCESS]: (state, action) => ({
      ...state,
      users: _.remove(state.users, (user) => user._id !== action.payload.user._id),
      matchResult: {},
      blockedUser: action.payload.user
    })
  },
  initialState
)
