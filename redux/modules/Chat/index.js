import _ from 'lodash'
import io from 'socket.io-client';
import {eventChannel, delay} from 'redux-saga';
import {apply, take, call, put, fork, race, select, cancelled} from 'redux-saga/effects';
import { BASE_URL } from '../../../utils/requests'
import {
  FETCH_MATCHES,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAIL 
} from '../Match'

// ->
// 'join-chat'
const JOIN_CHAT = 'chat/JOIN_CHAT';
// 'chat-ended'
const END_CHAT = 'chat/END_CHAT';
// 'send-message'
const SEND_MESSAGE = 'chat/SEND_MESSAGE';

// <-
// 'chat-joined'
const JOINED_CHAT = 'chat/JOINED_CHAT';
// 'new-message'
const NEW_MESSAGE = 'chat/NEW_MESSAGE';
// 'notification'
const NOTIFICATION = 'chat/NOTIFICATION';

// ~
const START_CHANNEL = 'chat/START_CHANNEL';
const STOP_CHANNEL = 'chat/STOP_CHANNEL';
const AUTH_ON = 'chat/AUTH_ON';
const AUTH_OFF = 'chat/AUTH_OFF';
const CHANNEL_ON = 'chat/CHANNEL_ON';
const CHANNEL_OFF = 'chat/CHANNEL_OFF';
const SERVER_ON = 'chat/SERVER_ON';
const SERVER_OFF = 'chat/SERVER_OFF';

const socketServerURL = `${BASE_URL}`;

const initialState = {
  chats: [],
  messages: [],
  channelStatus: 'off',
  serverStatus: 'unknown',
  auth: 'off',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_MATCHES:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_MATCHES_SUCCESS:
      const matchesChats = action.payload.map(({chat, user}) => ({user,
        ...{
          ...chat,
          messages: chat.messages
        }
      }))

      return {
        ...state,
        chats: matchesChats,
        isLoading: false
      }

    case FETCH_MATCHES_FAIL:
      return {
        ...state,
        isLoading: false
      }


    case JOINED_CHAT:
      return {...state, chats: _.uniqBy([...state.chats, action.payload], 'id')};

    case NEW_MESSAGE:
      const changeThisObj = _.find(state.chats, (o) => o.room === action.payload.room)

      return {
        ...state, 
        chats: _.uniqBy([
          {
            ...changeThisObj,
            reverted_messages: [
              {
                ...action.payload.message
              },
              ...changeThisObj.reverted_messages              
            ]
          },
          ...state.chats,
        ], 'id')
      };

    case AUTH_ON:
      return {...state, auth: 'on'};
    case AUTH_OFF:
      return {...state, auth: 'off'};
    case CHANNEL_ON:
      return {...state, channelStatus: 'on'};
    case CHANNEL_OFF:
      return {...state, channelStatus: 'off', serverStatus: 'unknown'};
    case SERVER_OFF:
      return {...state, serverStatus: 'off'};
    case SERVER_ON:
      return {...state, serverStatus: 'on'};
    default:
      return state;
  }
};

// action creators for Stop and Start buttons. You can also put them into componentDidMount
export const startChannel = () => ({type: START_CHANNEL});
export const stopChannel = () => ({type: STOP_CHANNEL});

export const joinChat = (roomId) => ({type: JOIN_CHAT, payload: roomId});
export const sendMessage = (payload) => ({type: SEND_MESSAGE, payload });
// wrapping functions for socket events (connect, disconnect, reconnect)
let socket;

const getPlainToken = (token) => {
    if (token) {
      return token.replace(/^JWT /,'');
    } else {
      return null;
    };
};

const connect = (token) => {
  socket = io(socketServerURL, { transports: ['websocket'] });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      // try to authenticats

      socket
        .emit('authenticate', {token: getPlainToken(token)}) 
        .on('authenticated', () => {
          resolve(socket);
        })
        .on('unauthorized', (msg) => {
          // throw new Error(msg.data.type);
        });
      //resolve(socket);
    });
  });
};

// const authenticated = () => {
//   socket = io(socketServerURL, { transports: ['websocket'] });
//   return new Promise((resolve) => {
//     socket.on('authenticated', () => {
//       resolve(socket);
//     });
//   });
// };
//
// const unauthorized = () => {
//   socket = io(socketServerURL, { transports: ['websocket'] });
//   return new Promise((resolve) => {
//     socket.on('unauthorized', (msg) => {
//       // throw new Error(msg.data.type);
//     });
//   });
// };

const disconnect = (socket) => {
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = (socket) => {
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

const chatJoined = (socket) => {
  return new Promise((resolve) => {
    socket.on('chat-joined', (chat) => {
      resolve({socket, chat});
    });
  });
};

// This is how channel is created
// this function creates an event channel from a given socket
// Setup subscription to incoming `some` events
//
const createSocketChannel = socket => eventChannel((emit) => {
  const handler = (data) => {
    // puts event payload into the channel
    // this allows a Saga to take this payload from the returned channel
    console.log('data',data)
    emit(data);
  };

  // setup the subscription
  socket.on('new-message', handler);

  // the subscriber must return an unsubscribe function
  // this will be invoked when the saga calls `channel.close` method
  return () => {
    socket.off('new-message', handler);
  };
});

// emit 'join-chat'
const emitJoinChat = function* (socket) {
  while (true) {
    const {payload} = yield take(JOIN_CHAT);
    yield apply(socket, socket.emit, ['join-chat', payload])
  }
}

// emmit 'chat-ended'
const emitEndChat = function* (socket) {
  while (true) {
    yield take(END_CHAT);
    yield apply(socket, socket.emit, ['chat-ended'])
  }
}

// emmit 'send-message'
const emitSendMessage = function* (socket) {
  while (true) {
    const { payload: { room, messages }} = yield take(SEND_MESSAGE);
    yield apply(socket, socket.emit, ['send-message', room, { text: messages[0].text }])
  }
}

// TODO: refactor these functions, do like functions above
// connection monitoring sagas
const listenDisconnectSaga = function* (socket) {
  while (true) {
    yield call(disconnect, socket);
    yield put({type: SERVER_OFF});
  }
};

const listenConnectSaga = function* (socket) {
  while (true) {
    yield call(reconnect, socket);
    yield put({type: SERVER_ON});
  }
};

const listenChatJoinedSaga = function* (socket) {
  while (true) {
    const { chat } = yield call(chatJoined, socket);
    yield put({type: JOINED_CHAT, payload: chat});
  }
};

// const listenAuthenticatedSaga = function* () {
//   while (true) {
//     yield call(authenticated);
//     yield put({type: AUTH_ON});
//   }
// };
//
// const listenUnauthorizedSaga = function* () {
//   while (true) {
//     yield call(unauthorized);
//     yield put({type: AUTH_OFF});
//   }
// };

// Saga to switch on channel.
const listenServerSaga = function* () {
  try {
    // 1, here I dispatch CHANNEL_ON type of action
    yield put({type: CHANNEL_ON});
    const token = yield select(state => state.user.profile.token)
    // 2, figure out if server runs or not but starting race between connect and
    // delay in 2sec
    const {timeout} = yield race({
      connected: call(connect, token),
      timeout: delay(2000),
    });
    // if timeout won the race start shutdowning process by dispatching SERVER_OFF type
    // of action
    if (timeout) {
      yield put({type: SERVER_OFF});
    }
    // if connect wins, get socket and create socketChannel with it 
    const socket = yield call(connect, token);
    const socketChannel = yield call(createSocketChannel, socket);

    // start listening to disconnect and connect sagas by using attached version
    // of fork
    // rules of attachment:
    //A Saga terminates only after
    // 1. It terminates its own body of instructions
    // 2. All attached forks are themselves terminated 
    yield fork(listenDisconnectSaga, socket);
    yield fork(listenConnectSaga, socket);
    yield fork(listenChatJoinedSaga, socket);
    // yield fork(listenAuthenticatedSaga);
    // yield fork(listenUnauthorizedSaga);

    // everything goes ok at this point, say it to the world
    yield put({type: SERVER_ON});
    yield put({type: AUTH_ON});

    yield fork(emitJoinChat, socket)
    yield fork(emitSendMessage, socket)

    while (true) {
      // now you can update store, by taking payload from socketChannel and
      // dispatching action
      //
      // I got something
      const payload = yield take(socketChannel);
      console.log('NEW MESSAGE PAYLOAD', payload)
      // returned something
      yield put({type: NEW_MESSAGE, payload});
    }
  } catch (error) {
    // catch errors
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({type: CHANNEL_OFF});
    }
  }
};

// saga listens for start and stop actions
export const startStopChannel = function* () {
  while (true) {
    // 0 - entry point
    yield take(START_CHANNEL);
    // start race between task that never ends/or reconnect? and waiting for STOP_CHANNEL
    // action which wins
    yield race({
      task: call(listenServerSaga),
      // triggers finally block in listenServerSaga somehow
      cancel: take(STOP_CHANNEL),
    });
    // repeat
  }
};
