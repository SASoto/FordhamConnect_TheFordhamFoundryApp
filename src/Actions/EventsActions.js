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
      // default: true
      popInitialNotification: true,
          /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
      requestPermissions: true,
    })

    // PushNotification.localNotification({
    //   //title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    //   message: title, // (required)
    //   playSound: false, // (optional) default: true
    //   //soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //   //repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
    //   //actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    // });

    PushNotification.localNotificationSchedule({
      message: `${title} ${time} ${location}`,
      number: 1,
      date: new Date(alarm_year, (alarm_month-1), alarm_day, alarm_hour, alarm_min) 
    });

    dispatch({type: NOT_SET_SUCCESS})
  }

}