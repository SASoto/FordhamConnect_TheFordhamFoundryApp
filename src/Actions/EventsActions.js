import {EVENTS_FETCH_SUCCESS, NOT_SET_SUCCESS} from './types'
import firebase from 'firebase'
import PushNotification from 'react-native-push-notification';


export const readEvents = () => {
  ref = firebase.database().ref(`/events`)

  return (dispatch) => {
    ref.on('value', snapshot => {
        dispatch({type: EVENTS_FETCH_SUCCESS, payload: snapshot.val()})
    })
  }
}

//Write events should be manually added to the database by admin



//Save 'number' to state?
//pass in date somehow

export const remindMe = (title, date, time, location, alarm_year, alarm_month, alarm_day, alarm_hour, alarm_min) => {
  console.log("remind me")

  return (dispatch) => {

    PushNotification.configure({
      onNotification: (notification) => {
        console.log( 'NOTIFICATION:', notification )
      },
      // Should the initial notification be popped automatically
      popInitialNotification: true,
      requestPermissions: true,
    })


    PushNotification.localNotificationSchedule({
      message: `${title} ${time} ${location}`,
      number: 1,
      date: new Date(alarm_year, (alarm_month-1), alarm_day, alarm_hour, alarm_min) 
    });

    dispatch({type: NOT_SET_SUCCESS})
  }

}