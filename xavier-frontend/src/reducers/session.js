import {login, logout} from '../lib/apiServices';

const initState = {
  user: {},
};

const LOGIN_SUCCESSFUL = 'session/LOGIN_SUCCESSFUL'
const LOGIN_FAILED = 'session/LOGIN_FAILED'
const SESSION_ENDED = 'session/SESSION_ENDED'

const loginSuccessful = (user) => ({type: LOGIN_SUCCESSFUL, payload: user})
const loginFailed = (error) => ({type: LOGIN_FAILED, payload: error})
const sessionEnded = () => ({type: SESSION_ENDED, payload: {}})

export const signOut = ()  => {
  return (dispatch, getState) => {
    const {session} = getState()
    return logout(session.user.id)
      .then(dispatch(sessionEnded()));
  }
};

export const authenticate = (email, password) => {
  return (dispatch) => {
    return login(email, password)
      .then(
        res => {
          console.log(res)
          if (res.error) {
            dispatch(loginFailed(res))
          } else {
            dispatch(loginSuccessful(res))
          }
        }
      )
  }
}

// const loadStoriesIntoState = (stories) => ({})

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {user: action.payload}
    case LOGIN_FAILED:
      return {errors: action.payload}
    case SESSION_ENDED:
      return {user: {}}
    default:
      return state;
  }
};
