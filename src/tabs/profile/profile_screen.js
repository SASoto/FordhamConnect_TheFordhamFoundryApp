import React, {Component} from 'react';
import {Dimensions, Keyboard, Text, TextInput, View, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Button, ScrollView} from 'react-native';

import ButtonRounded from '../../components/ButtonRounded';
import TextInputUnderline from '../../components/TextInputUnderline';

const windowSize = Dimensions.get('window');
export default class profile_screen extends Component {
	render() {
		return (
				<View flex={1}>
				<ImageBackground
					resizeMode="cover"
					style={{
		                flex: 1,
		                position: 'absolute',
		                width: '100%',
		                height: '100%',
	              	}}

	              	source={require('../../../Images/plussilvergradient.png')}

	            >
				<ScrollView flex={1} height={500}>				
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View flex={1} alignItems="flex-start" marginTop={20} marginLeft={28}>
						<View alignItems="center">
							<View width={70} height={70} borderRadius={35} backgroundColor='grey'/>
						</View>
						<View marginTop={20}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>FORDHAM EMAIL*</Text></View>
					        <TextInput
					          style = {styles.input}				        
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={false}
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>FIRST NAME*</Text></View>
					        <TextInput
					          style = {styles.input}				          
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={false}				  		         				       
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>LAST NAME*</Text></View>
					        <TextInput
					          style = {styles.input}				       
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={false}		     				          
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>PASSWORD*</Text></View>
					        <TextInput
					          style = {styles.input}				          
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={false}			      				          
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>PERSONAL HEADLINE</Text></View>
					        <TextInput
					          style = {styles.input}				          
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={true}
					          placeholder="ex. FCRH '15 or Gabelli '87"			      				          
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>						
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>WEBSITE LINK</Text></View>
					        <TextInput
					          style = {styles.input}				          
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={true}		
					          placeholder="ex. LinkedIn/a personal site"	      				          
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>						
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>LOCATION</Text></View>
					        <TextInput
					          style = {styles.input}				          
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={true}			      				          
					          placeholder="ex. Greater New York City Area"
					        />
					        <View borderBottomWidth={1} borderColor="rgb(115,115,115)"/>
					        </View>						
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>BIO</Text></View>
					        <TextInput
					          style = {styles.input}				          
					          autoCapitalize = 'none'
					          autoCorrect = {false}
					          editable={true}
					          multiline={true}
					          placeholder="ex. Tell use about your work experience, association with the Fordham Foundry, or anything relevant to your education or career!"      				          
					        />
					        </View>						
						</View>
						<View backgroundColor="transparent" height={275}/>
					</View>
				</TouchableWithoutFeedback>
				</ScrollView>
				<View height={((windowSize.height*1/10) * .9)} backgroundColor="grey" justifyContent="center" alignItems="flex-end">
					<TouchableOpacity style={styles.saveButtonCont} onPress={() => console.log('does nothing')}>
							<Text style={styles.saveTxt}>SAVE</Text>
					</TouchableOpacity>
				</View>
				</ImageBackground>
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
    fontFamily: 'SFProText-Light',
    color: 'rgb(115,115,115)',
    fontWeight: '300',
    fontSize: 13
  },
  input:{
    fontFamily: 'SFProText-Regular',
    height: 40,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 15
  },
  fordhamAffilCont: {
  	borderRadius: 4,
  	borderWidth: 1,
  	borderColor: 'grey'
  },
  saveButtonCont: {
  	marginRight: 14,
  	backgroundColor: '#47101E',
  	borderRadius: 8,
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingHorizontal: 25,
  },
  saveTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
  }
});