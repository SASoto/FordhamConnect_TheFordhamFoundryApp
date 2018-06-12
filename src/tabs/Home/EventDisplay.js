import React from 'react'
import {StyleSheet, Text, View, Button, Linking} from 'react-native'
import {connect} from 'react-redux';
import {EventButton} from '../../Components/Common'

import Icon from 'react-native-vector-icons/Ionicons';

const renderAddToCalender = (title, date, time, location, alarm_year, alarm_month, alarm_day, alarm_hour, alarm_min, remindMe ) => {
      return (
        <View style = {styles.buttonCont}>
          <Icon.Button justifyContent = "center" name = "ios-alarm" backgroundColor = "#4AB312" color = "white" 
                       onPress={ () => { remindMe(title, date, time, location, alarm_year, alarm_month, alarm_day, alarm_hour, alarm_min), alert('You Will Be Notified!')}}>
             Remind me!
          </Icon.Button>
        </View>
      )
}

const renderButton = (link) => {
    return(
      <EventButton onPress={ () => Linking.openURL(link) }>
        Learn more
      </EventButton>
   );
}

const EventDisplay = ({title, location, date, time, link,
                      alarm_year, alarm_month, alarm_day, alarm_hour, alarm_min, remindMe}) => {

  return (
        <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            {title!==null ? <Text style = {styles.titleStyle}>{title}</Text> : <Text style = {styles.titleStyle}>The title is not specified</Text>}
            {location!==null ? <Text style = {styles.whereStyle}>{location}</Text> : <Text style = {styles.whereStyle}>The location is not specified</Text>}
          </View>
          <View flexDirection = "row" alignItems = "center" marginBottom = {10}>
            <View>
              {date!==null ? <Text style = {styles.dateStyle}>{date} @ </Text> : <Text style = {styles.dateStyle}>The date is not specified</Text>}
            </View>
              {time!==null ? <Text style = {styles.whenStyle}>{time}</Text> : <Text style = {styles.whenStyle}>The time is not specified</Text>}
          </View>
          <View flexDirection = "row" marginBottom = {10}>
            <View>
              {renderAddToCalender(title, date, time, location, alarm_year, alarm_month, alarm_day, alarm_hour, alarm_min, remindMe)}
            </View>
            <View width = {5}/>
            <View justifyContent = "center">
              {link!=="" ? renderButton(link) : <Text></Text>}
            </View>
          </View>
        </View> 
  )
}

const styles = StyleSheet.create ({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8E8E8E'
  },
  titleContainer:{
    alignItems: 'center'
  },
  buttonCont: {
    height: 45,
    width: 130,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: "GillSans"
  },
  whereStyle: {
    fontSize: 16,
    fontFamily: "GillSans-Light",
  },
  dateStyle: {
    fontSize: 18,
    fontFamily: "GillSans-Light"
  },
  whenStyle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: "GillSans-Light"
  }
});

export { EventDisplay }