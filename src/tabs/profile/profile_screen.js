import React, {Component} from 'react';
import {Dimensions, Text, TextInput, View, TouchableOpacity, Button, ScrollView} from 'react-native';

import ButtonRounded from '../../components/ButtonRounded';
import TextInputUnderline from '../../components/TextInputUnderline';

const windowSize = Dimensions.get('window')
export default class profile_screen extends Component {

	render() {
		return (
				<View flex={1}>
				<ScrollView backgroundColor="white">				
					<View alignItems="center">
						<View alignItems="center" marginTop={20}>
							<View marginBottom={10}>
								<Text style={styles.photoTxt}>Profile Photo</Text>
							</View>
							<View width={70} height={70} borderRadius={35} backgroundColor='grey'/>
						</View>
						<View marginTop={20}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>FORDHAM EMAIL</Text></View>
					        <TextInput
					          style = {styles.input}				        
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={false}
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
					          editable={false}				  		         				       
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
					          editable={false}		     				          
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
					          editable={false}			      				          
					        />
					        <View borderBottomWidth={1} borderColor="#979797"/>
					        </View>
						</View>
						<View marginTop={15}>
						<View flexDirection="column">
							<View width={windowSize.width * .85}>
							<Text style={styles.textStyle}>FORDHAM AFFILIATION</Text>
							<Text style={styles.textStyle}>I AM A(N)</Text>
							</View>
							<View marginVertical={10} width={windowSize.width * .85} height={100} style={styles.fordhamAffilCont}>
							</View>
						</View>
						</View>
					</View>
				</ScrollView>
				<View height={((windowSize.height*1/10) * .9)} backgroundColor="grey" justifyContent="center" alignItems="flex-end">
					<TouchableOpacity style={styles.saveButtonCont} onPress={() => console.log('does nothing')}>
							<Text style={styles.saveTxt}>SAVE</Text>
					</TouchableOpacity>
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
  fordhamAffilCont: {
  	borderRadius: 4,
  	borderWidth: 1,
  	borderColor: 'grey'
  },
  saveButtonCont: {
  	//width: 75,
  	marginRight: 14,
  	backgroundColor: '#47101E',
  	borderRadius: 8,
  	// paddingLeft: 1,
  	// paddingRight: 1,
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingHorizontal: 25,
  	//position: 'absolute'
  	//paddingBottom: 8
  },
  saveTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Medium',
    // fontWeight: '300',
  }
});