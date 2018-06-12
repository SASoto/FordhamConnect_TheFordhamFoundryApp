import React, {Component} from 'react';
import {Dimensions, Text, TextInput, View, TouchableOpacity, Button} from 'react-native';

import ButtonRounded from '../../components/ButtonRounded';
import TextInputUnderline from '../../components/TextInputUnderline';

const windowSize = Dimensions.get('window')
export default class profile_screen extends Component {

	render() {
		return (
				<View flex={1}>
				<View flex={1} alignItems="center" backgroundColor="white">
					<View alignItems="center" marginTop={20}>
						<View marginBottom={10}>
							<Text style={styles.photoTxt}>Profile Photo</Text>
						</View>
						<View width={80} height={80} borderRadius={40} backgroundColor='grey'/>
					</View>
					<View marginTop={20}>
						<View>
				          <View backgroundColor="transparent"><Text style={styles.textStyle}>FORDHAM EMAIL</Text></View>
				        <TextInput
				          style = {styles.input}				        
				          autoCapitalize = 'none'
				          autoCorrect = {false}
				        />
				        <View borderBottomWidth={1} borderColor="#979797"/>
				        </View>
					</View>
					<View marginTop={15}>
						<View>
				          <View backgroundColor="transparent"><Text style={styles.textStyle}>FIRST NAME</Text></View>
				        <TextInput
				          style = {styles.input}				          
				          autoCapitalize = 'none'
				          autoCorrect = {false}				         				          
				        />
				        <View borderBottomWidth={1} borderColor="#979797"/>
				        </View>
					</View>
					<View marginTop={15}>
						<View>
				          <View backgroundColor="transparent"><Text style={styles.textStyle}>LAST NAME</Text></View>
				        <TextInput
				          style = {styles.input}				       
				          autoCapitalize = 'none'
				          autoCorrect = {false}				     				          
				        />
				        <View borderBottomWidth={1} borderColor="#979797"/>
				        </View>
					</View>
					<View marginTop={15}>
						<View>
				          <View backgroundColor="transparent"><Text style={styles.textStyle}>LOCATION</Text></View>
				        <TextInput
				          style = {styles.input}				          
				          autoCapitalize = 'none'
				          autoCorrect = {false}				      				          
				        />
				        <View borderBottomWidth={1} borderColor="#979797"/>
				        </View>
					</View>
					<View marginTop={15}>
						<View>
							<Text>FORDHAM AFFILIATION</Text>
						</View>
					</View>
				</View>
				<View height={(windowSize.height*1/10)} backgroundColor="grey" justifyContent="center" alignItems="flex-end">
					<View margin={14}>
						<TouchableOpacity style={styles.saveButtonCont} onPress={() => console.log('does nothing')}>
							<Text style={styles.saveTxt}>SAVE</Text>
						</TouchableOpacity>
					</View>
				</View>
				</View>
		)
	}
}

const styles = ({
	photoTxt: {
		fontFamily: 'HelveticaNeue-Medium',
		color:'#424242'
	},
  textStyle: {
    fontFamily: 'HelveticaNeue-Thin',
    color: '#979797',
    fontWeight: '300',
    fontSize: 12
  },
  input:{
    fontFamily: 'HelveticaNeue-Thin',
    height: 40,
    width: windowSize.width * .85,
    color: '#979797',
    fontSize: 15
    //paddingHorizontal: 10
  },
  saveButtonCont: {
  	width: 110,
  	backgroundColor: '#47101E',
  	borderRadius: 2,
  	// paddingLeft: 1,
  	// paddingRight: 1,
  	paddingTop: 8,
  	paddingBottom: 8
  },
  saveTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'HelveticaNeue-Medium',
    // fontWeight: '300',
  }
});