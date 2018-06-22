import React from 'react'
import {StyleSheet, Text, View, Image, Linking} from 'react-native'
import {connect} from 'react-redux';
import {UpdateButton} from '../../Components/Common'

const UpdateDisplay = ({title, update, date, link}) => {

  showTitle = ()=> {
    if({title}.title === 'brevite' || {title}.title === 'Brevite')
    {
      return (
          <Image style = {styles.photoStyle} source = {require('../../../Images/brevite.jpg')}/>
        );
    }
    else if({title}.title === 'kindmind' || {title}.title === 'KindMind')
    {
      return (
          <Image style = {styles.photoStyle} source = {require('../../../Images/KindMind.jpg')}/>
        );
    }
    else if({title}.title === 'pathos' || {title}.title === 'Pathos')
    {
      return (
           <Image style = {styles.photoStyle} source = {require('../../../Images/pathoslogo.png')}/>
        );
    }
    else if({title}.title === 'radiate' || {title}.title === 'Radiate')
    {
      return (
          <Image style = {styles.photoStyle} source = {require('../../../Images/redplanet.jpg')}/>
        );
    }
    else if({title}.title === 'red planet' || {title}.title === 'redplanet' || {title}.title === 'RedPlanet' || {title}.title === 'Red Planet')
    {
      return (
          <Image style = {styles.photoStyle} source = {require('../../../Images/radiate.jpg')}/>
        );
    }
    else if({title}.title === 'spire and co' || {title}.title === 'spireandco' || {title}.title === 'SpireandCo' || {title}.title === 'Spire and Co' || {title}.title === 'Spire And Co' || {title}.title === 'SpireAndCo')
    {
      return (
          <Image style = {styles.photoStyle} source = {require('../../../Images/spirecobox.jpg')}/>
        );
    }
    else if({title}.title === "ventir" || {title}.title === "Ventir")
    {
      return (
          <Image  style = {styles.photoStyle} source = {require('../../../Images/ventir.png')}/>
        );
    }
    else {
      return (
        <Image style = {styles.photoStyle} source = {require('../../../Images/fordham-rams-logo.png')}/>
      );
    }
  }

  renderButton = (link) => {
    return (
      <UpdateButton onPress={ () => Linking.openURL(link) }>
        Link
      </UpdateButton>
    )
  }

  return (
        <View style = {styles.container}>
          <View flex = {1} alignItems = "center">
          {showTitle()}
          </View>
          <View flex = {2}>
          {update!==null ? <Text style = {styles.updateStyle}>{update}</Text> : <Text style = {styles.updateStyle}>Update not specified</Text>}
          {date!==null ? <Text style = {styles.dateStyle}>{date}</Text> : <Text style = {styles.dateStyle}>The date is not specified</Text>}
          </View>
          <View>
          {link!=="" ? renderButton(link) : <View/>}
          </View>
        </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8E8E8E'
  },
  buttonCont: {
    height: 45,
    width: 130,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: "GillSans"
  },
  updateStyle: {
    fontSize: 18,
    fontFamily: "GillSans-Light",
    fontWeight: '300'
  },
  dateStyle: {
    fontSize: 12,
    fontFamily: "GillSans-Light"
  },
  photoStyle: {
    height: 63,
    width: 70,
    borderRadius: 15, 
  }
});

export { UpdateDisplay }