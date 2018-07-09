import {EMAIL_CHANGED, PASSWORD_CHANGED, CONFIRM_CHANGED, FIRSTNAME_CHANGED, LASTNAME_CHANGED, INITIALS_CHANGED, HEADLINE_CHANGED, WEBSITE_CHANGED, LOCATION_CHANGED, BIO_CHANGED, LOGIN_USER_SUCCESS, NO_USER, IS_EMPTY, NEW_USER, EXISTS_FAIL, LOGIN_USER_FAIL,LOGIN_USER, LOGOUT_USER_SUCCESS, LOGGEDIN_USER} from '../Actions/types'
const INITIAL_STATE = {
  email: '', 
  password: '',
  confirm: '', 
  firstname: '',
  lastname: '',
  initials: '',
  headline: '',
  website: '',
  location: '',
  bio: '',
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
    case CONFIRM_CHANGED:
      return {...state, confirm: action.payload}
    case FIRSTNAME_CHANGED:
      console.log("Ran FIRSTNAME_CHANGED:", state.firstname)
      return {...state, firstname: action.payload}
    case LASTNAME_CHANGED:
      console.log("Ran LASTNAME_CHANGED:", state.lastname)
      return {...state, lastname: action.payload}
    case INITIALS_CHANGED:
      console.log("Ran INITIALS_CHANGED:", state.initials)
      return {...state, initials: action.payload}
    case HEADLINE_CHANGED:
      console.log("Ran HEADLINE_CHANGED:", state.headline)
      return {...state, headline: action.payload}
    case WEBSITE_CHANGED:
      console.log("Ran WEBSITE_CHANGED:", state.website)
      return {...state, website: action.payload}
    case LOCATION_CHANGED:
      console.log("Ran LOCATION_CHANGED:", state.location)
      return {...state, location: action.payload}
    case BIO_CHANGED:
      console.log("Ran BIO_CHANGED:", state.bio)
      return {...state, bio: action.payload}
    case LOGIN_USER:
      console.log("EMAIL IS FROM REDUCER:", state.email)
      console.log("password IS FROM REDUCER:", state.password)
      return {...state, /*...INITIAL_STATE,*/ loading: true, error: ''}
    case LOGIN_USER_SUCCESS:
      return {...state, /*...INITIAL_STATE,*/ user: action.payload, loading: false, loggedIn: true}
    case LOGIN_USER_FAIL:
      return {...INITIAL_STATE, error: 'Authentication Failed.'}
    case LOGOUT_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, loggedIn: false} //added loading = false
    case LOGGEDIN_USER:
      return {...state, /*...INITIAL_STATE,*/ user: action.payload, loggedIn: true} // took our initial state
    case NO_USER:
      return {...state, user: null, error: "User Does Not Exist", loading: false}
    case NEW_USER:
      console.log("NEW USER FIRSTNAME IS: ", state.firstname)
      return {...state, ...INITIAL_STATE, loading: true}//, email: '', password: ''}
    case EXISTS_FAIL:
      return {...state, error: "User Exists Already", password: '', loading: false} 
    case IS_EMPTY: 
      return {...state, ...INITIAL_STATE, loading: false}
    default:
      return {...state};
  }
}