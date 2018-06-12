import {UPDATES_FETCH_SUCCESS} from '../Actions/types'

const INITIAL_STATE = {
  updates: {},
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  
  switch(action.type) {
    case UPDATES_FETCH_SUCCESS:
    console.log(action.payload)
      return {...state, updates: action.payload, loading:false}
    default:
      return {...state}
  }
}