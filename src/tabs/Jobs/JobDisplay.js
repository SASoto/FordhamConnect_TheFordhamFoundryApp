import React from 'react';
import {Text, View, Linking, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {LinkButton, DeleteButton, ClickMe} from '../../Components/Common';

const renderButton = (canDelete, jobKey, jobDelete, onReturn, visible) => {  
  
  closeModal = (jobKey) => {
    jobDelete(jobKey)
    onReturn()
  }

  if(canDelete)
    return(
      <View marginTop = {10} alignItems = "center" borderTopWidth = {StyleSheet.hairlineWidth}>
        <DeleteButton onPress={() => {closeModal(jobKey)}}>
          Delete
        </DeleteButton>
      </View>
    )
}

const showLinkButton = (jobBoard, jobKey) => 
{
    if(!jobBoard.hasOwnProperty(jobKey))
    {
      return
    } 
    else if(jobBoard[jobKey].link === '')
    {
      return
    }
    else {
      return (
        <View>
        <View height = {15}/>
        <LinkButton jobBoard = {jobBoard} jobKey = {jobKey}>Learn more</LinkButton>
        </View>
      )
  }
}

const showEmail = (jobBoard, jobKey) => 
{
    if(!jobBoard.hasOwnProperty(jobKey))
    {
      return
    } 
    else if(jobBoard[jobKey].contact === '')
    {
      return
    }
    else {
      return (
        <ClickMe onPress = {() => Linking.openURL(`mailto:${jobBoard[jobKey].contact}`)}>
        <Text style = {styles.linkText}>
        {`${jobBoard[jobKey].contact}`}
        </Text>
        </ClickMe>
      )
  }
}
    

const JobDisplay = ({jobBoard, jobKey, canDelete, jobDelete, onReturn, visible}) => {

  if(jobBoard === null)
  {
    return null
  }
  else {
    return (
    <View>
        <View style = {styles.titleandname}>
        {jobBoard.hasOwnProperty(jobKey) ? <Text style = {styles.titleStyle}>{`${jobBoard[jobKey].title}`}</Text>:<Text></Text>}
        {jobBoard.hasOwnProperty(jobKey) ? <Text style = {styles.nameStyle}>{`${jobBoard[jobKey].name}`}</Text>:<Text></Text>}
        </View>
        {jobBoard.hasOwnProperty(jobKey) ? <Text style = {styles.descStyle}>{jobBoard[jobKey].description}</Text>:<Text></Text>}
        <View style = {styles.contactCont}>
        {showEmail(jobBoard, jobKey)}
        </View>
        {showLinkButton(jobBoard, jobKey)}
        {canDelete ? renderButton(canDelete, jobKey, jobDelete, onReturn, visible):<Text></Text>}
    </View>
    );
  }
}

const styles = {
  titleandname: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5
  },
  contactCont: {
    marginTop: 10
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'GillSans',
    paddingBottom: 2,
    color: 'darkblue'
  },
  nameStyle: {
    fontSize: 14,
    fontFamily: 'GillSans-Light'
  },
  descStyle: {
    fontSize: 14,
    fontFamily: 'GillSans-Light'
  },
  linkText: {
    color: 'blue',
    fontSize: 14
  }
}

export {JobDisplay}