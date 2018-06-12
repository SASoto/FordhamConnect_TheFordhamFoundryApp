import React,{Component} from 'react';
import {Text, View, Linking, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard} from 'react-native';
import {Button, ClickMe} from '../../Components/Common';

import ViewContainer from '../../Components/Common/ViewContainer';
import {logoutUser, loggedInUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import {handleLogout} from '../handlelogout';

class logout_screen extends Component {
  constructor (props){
    super(props);

    this.state = {
      settingsButtonPressed: false,
      allowTextChange: false,
      dynBackColor: '#F5FCFF',
      dynLogoutBackColor: 'maroon'
    };
  }

  // Logs out user and performs transition to onboarding screen
	onButtonPress(){
    this.props.logoutUser()

    if(this.props.loggedIn === true) {
    	{this.checkFlag()}
  	}
  }

  // Checks for moment when loggedIn prop value changes to false
  checkFlag() {
    if(this.props.loggedIn === true) {
      console.log("In here")
      setTimeout(this.checkFlag.bind(this), 1000)
    }
    else {
      handleLogout(this.props.navigation)
     }
  }

  pressedSettingsButton() {
    this.setState({settingsButtonPressed: !this.state.settingsButtonPressed})
    this.setState({allowTextChange: !this.state.showText})
    setTimeout(() => {this.setState({dynBackColor: this.state.dynBackColor === '#F5FCFF' ? '#37ba16' : '#F5FCFF'})}, 50);
    setTimeout(() => {this.setState({dynLogoutBackColor: this.state.dynLogoutBackColor === 'maroon' ? 'lightgray' : 'maroon'})}, 25);
  }

  pressedSaveButton() {
    this.setState({settingsButtonPressed: !this.state.settingsButtonPressed})
    this.setState({allowTextChange: false})
    setTimeout(() => {this.setState({dynBackColor: this.state.dynBackColor === '#F5FCFF' ? '#37ba16' : '#F5FCFF'})}, 50);
    setTimeout(() => {this.setState({dynLogoutBackColor: this.state.dynLogoutBackColor === 'maroon' ? 'lightgray' : 'maroon'})}, 25);
    //Change firebase data code here
  }

  pressedCancelButton() {
    this.setState({settingsButtonPressed: !this.state.settingsButtonPressed})
    this.setState({allowTextChange: false})
    setTimeout(() => {this.setState({dynBackColor: this.state.dynBackColor === '#F5FCFF' ? '#37ba16' : '#F5FCFF'})}, 50);
    setTimeout(() => {this.setState({dynLogoutBackColor: this.state.dynLogoutBackColor === 'maroon' ? 'lightgray' : 'maroon'})}, 25);
    //Change firebase data code here
  }

  // Renders user data if the user is logged in, otherwise renders a goodbye message and signs out
  renderContent() {
    if(this.props.loggedIn === true) {
      return(
        <View paddingTop={10} alignItems="center" marginBottom={20} backgroundColor={this.state.dynBackColor}>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Text style={{fontWeight: 'bold'}}>Username:</Text>
            </View>
            <TextInput
                style={styles.input}
                editable = {this.state.allowTextChange}
                defaultValue = {firebase.auth().currentUser.displayName}
                autoCapitalize = 'none'
                autoCorrect = {false}
                placeholderTextColor = 'rgba(0,0,0,0.6)'>
            </TextInput>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Text style={{fontWeight: 'bold'}}>Email:</Text>
            </View>
            <TextInput
                style={styles.input}
                editable = {this.state.allowTextChange}
                defaultValue = {firebase.auth().currentUser.email}
                autoCapitalize = 'none'
                autoCorrect = {false}
                placeholderTextColor = 'rgba(0,0,0,0.6)'>
            </TextInput>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Text style={{fontWeight: 'bold'}}>Password:</Text>
            </View>
            <TextInput
                style={styles.input}
                editable = {this.state.allowTextChange}
                defaultValue = 'Not Shown'
                autoCapitalize = 'none'
                autoCorrect = {false}
                placeholderTextColor = 'rgba(0,0,0,0.6)'>
            </TextInput>
          </View>
        </View>
        );
    } else {
        return(
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Text style={{fontWeight: 'bold'}}>See You Again Soon!</Text>
            </View>
          </View>
          );
    }
  }

  // If the settings button is pressed, the save button is rendered
  // If the save button is pressed, the settings button is rendered
  renderSetOrSave() {
    if(this.state.settingsButtonPressed) {
      return (
        <View style = {styles.settingsCont}>
          <TouchableOpacity onPress = {this.pressedSaveButton.bind(this)} style={styles.saveStyle}>
            <Text style={styles.setTextStyle}>Save</Text>
          </TouchableOpacity>
          <View width = {10}/>
          <TouchableOpacity onPress = {this.pressedCancelButton.bind(this)} style={styles.cancelStyle}>
            <Text style={styles.setTextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
        return (
          <View style = {styles.settingsCont}>
            <TouchableOpacity onPress = {this.pressedSettingsButton.bind(this)} style={styles.settingsStyle}>
              <Text style={styles.setTextStyle}>Settings</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }

	render() {
    return (
      <View flex={1} backgroundColor={'#F5FCFF'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View flexDirection = "column" marginTop = {20}>
            <View alignItems="center">
                <Image source = {require('../../../Images/logo.png')} 
                  style={{
                  width: 200,
                  height: 200,
                  }}/>
            </View>
            
            {this.renderContent()}
            
            <View alignItems="center">
            {this.renderSetOrSave()}
            </View>

            <View alignItems="center">
              <View style={styles.logoutButtonCont}>
              <View style={styles.logoutButtonStyle} backgroundColor={this.state.dynLogoutBackColor}>
                <TouchableOpacity disabled={this.state.settingsButtonPressed}  onPress={this.onButtonPress.bind(this)}><Text style={styles.logoutTextStyle}>Log out</Text></TouchableOpacity>
              </View>
              </View>
            </View>
            <View height = {70}/>
              <View alignItems="center">
              <ClickMe onPress = {() => Linking.openURL('https://goo.gl/forms/Gv0ZJiEMQbzauTOo1')}>
                <Text style = {styles.feedbackText}>Leave us feedback by clicking here!</Text>        
              </ClickMe>
              </View>
            </View>
          
        </TouchableWithoutFeedback>
      </View>
    )
	}
}

const styles = {
  settingsCont: {
    flexDirection: 'row',
    width: 250,
    marginBottom: 10,
  },
  setTextStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    padding: 8
  },
  settingsStyle: {
    flex: 1,
    backgroundColor: '#2ab9e7',
    borderRadius: 5,
    borderColor: 'black',
  },
  saveStyle: {
    flex: 1,
    backgroundColor: '#37ba16',
    borderRadius: 5,
    borderColor: 'black',
  },
  cancelStyle: {
    flex: 1,
    backgroundColor: '#f21a1a',
    borderRadius: 5,
    borderColor: 'black',
  },
	feedbackText: {
		fontSize: 20,
		color: '#0981CC',
		fontWeight: '400',
		fontFamily: 'GillSans-Light',
		justifyContent: "center"
	},
  inputContainer: {
    marginBottom: 15
  },
  labelContainer: {
    alignItems: 'center',
    marginBottom: 5
  },
  input: {
    fontFamily: 'GillSans-Light',
    height: 40,
    width: 300,
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    paddingHorizontal: 10
  },
  logoutTextStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    padding: 8
  },
  logoutButtonCont: {
    flexDirection: 'row',
    width: 250,
    marginBottom: 5,
  },
  logoutButtonStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps, {logoutUser, loggedInUser})(logout_screen)