import {UPDATES_FETCH_SUCCESS} from './types'
import firebase from 'firebase'



export const readUpdates = () => {
  ref = firebase.database().ref(`/updates`)

  return (dispatch) => {
    ref.on('value', snapshot => {
        dispatch({type: UPDATES_FETCH_SUCCESS, payload: snapshot.val()})
    })
  }
}