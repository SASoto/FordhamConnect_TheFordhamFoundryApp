import {EMAIL_CHANGED, PASSWORD_CHANGED, FIRSTNAME_CHANGED, LASTNAME_CHANGED, LOGIN_USER_SUCCESS, NO_USER, IS_EMPTY, NEW_USER, EXISTS_FAIL, LOGIN_USER_FAIL,LOGIN_USER, LOGOUT_USER_SUCCESS, LOGGEDIN_USER} from '../Actions/types'
const INITIAL_STATE = {
  email: '', 
  password: '', 
  firstname: '',
  lastname: '',
  user: null, 
  error: '', 
  loading: false,
  loggedIn: null
}

export default (state = INITIAL_STATE, action) => {
  //console.log(action)
  switch(action.type){
    case EMAIL_CHANGED:
      return {...state, email: action.payload}
    case PASSWORD_CHANGED:
      return {...state, password: action.payload}
    case FIRSTNAME_CHANGED:
      return {...state, firstname: action.payload}
    case LASTNAME_CHANGED:
      return {...state, lastname: action.payload}
    case LOGIN_USER:
      return {...state, ...INITIAL_STATE, loading:true, error: ''}
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload, loggedIn: true}
    case LOGIN_USER_FAIL:
      return {...state, user: null, error: 'Authentication Failed.', password: '', loading: false}
    case LOGOUT_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, loggedIn: false} //added loading = false
    case LOGGEDIN_USER:
      return {...state, ...INITIAL_STATE, user: action.payload, loggedIn: true}
    case NO_USER:
      return {...state, user: null, error: "User Does Not Exist", loading: false}
    case NEW_USER:
      return {...state, ...INITIAL_STATE, loading: true, email: '', password: ''}
    case EXISTS_FAIL:
      return {...state, error: "User Exists Already", password: '', loading: false} 
    case IS_EMPTY: 
      return {...state, ...INITIAL_STATE, password:'', loading: false}
    default:
      return state
  }
}