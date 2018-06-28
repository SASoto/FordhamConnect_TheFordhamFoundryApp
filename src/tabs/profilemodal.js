import React, {Component} from 'react';
import {Dimensions, Keyboard, Modal, View, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
export default class profilemodal extends Component {
	render () {
		return (
			<Modal
				animationType="slide"
	        	transparent={false}
	        	visible={this.props.modalVisible}
			>
			<View flex={1}>
				<ImageBackground
					resizeMode="cover"
					style={{
		                flex: 1,
		                //resizeMode,
		                position: 'absolute',
		                width: '100%',
		                height: '100%',
		                //alignItems: 'center',
	              	}}

	              	source={require('../../Images/plussilvergradient.png')}

	            >
								
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					
					<ScrollView flex={1} top={0} bottom={0} stickyHeaderIndices={[0]}>
						<View flex={1}>
						<ImageBackground
							resizeMode='cover'
							style={{
								flex: 1,
								height: 75
								//position: 'absolute',
								//top:0,

								//width: '100%',
								//height: '100%',
							}}

			              source={require('../../Images/positionedblur.png')}

						>
						<View flex={1} marginTop={35} justifyContent="center">
							<View flex={1} flexDirection="row" justifyContent="space-between">
								<TouchableOpacity onPress={() => this.props.modalFunc()}>
									<View flex={1} paddingLeft={30} paddingTop={2}>
										<MatIcon name="close" size={24} color="rgb(255,255,255)"/>
									</View>
								</TouchableOpacity>
								<View paddingRight={20} paddingBottom={10}>
									<Button title="Save" color="#007AFF" onPress={() => console.log('do nothing')}/>
								</View>
							</View>
						</View>
						</ImageBackground>
						</View>
					<View flex={1} alignItems="flex-start" backgroundColor="rgba(106,46,52,0.1)">
						<View paddingTop={20} paddingLeft={28}>
							<View flexDirection="row">
								<View width={70} height={70} borderRadius={35} backgroundColor='grey'/>
								<View marginLeft={16} justifyContent="center">
									<Text>HELLO</Text>
								</View>
							</View>
							<View marginTop={32}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>FORDHAM EMAIL*</Text></View>
							        <View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				        
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={false}
							        />
							        </View>
						        </View>
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>FIRST NAME*</Text></View>
							        <View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				          
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={false}				  		         				       
							        />
							        </View>
						        </View>
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>LAST NAME*</Text></View>
							        <View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				       
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={false}		     				          
							        />
							        </View>
						        </View>
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>PASSWORD*</Text></View>
						        	<View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				          
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={false}			      				          
							        />
							        </View>					
						        </View>
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>PERSONAL HEADLINE</Text></View>
						        	<View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				          
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={true}
							          placeholder="ex. FCRH '15 or Gabelli '87"			      				          
							        />
							        </View>						    
						        </View>						
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>WEBSITE LINK</Text></View>
							        <View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				          
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={true}		
							          placeholder="ex. LinkedIn/a personal site"	      				          
							        />
							        </View>
						        </View>						
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>LOCATION</Text></View>
							        <View style={styles.inputBackground}>
							        <TextInput
							          style = {styles.input}				          
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={true}			      				          
							          placeholder="ex. Greater New York City Area"
							        />
							       </View>
						        </View>						
							</View>
							<View marginTop={13}>
								<View>
						          <View backgroundColor="transparent"><Text style={styles.textStyle}>BIO</Text></View>
							        <View style={styles.inputBackground4Bio}>
							        <TextInput
							          style = {styles.input4Bio}				          
							          autoCapitalize = 'none'
							          autoCorrect = {false}
							          editable={true}
							          multiline={true}
							          placeholder="ex. Tell use about your work experience, association with the Fordham Foundry, or anything relevant to your education or career!"      				          
							        />
							        </View>
						        </View>						
						</View>
						<View backgroundColor="transparent" height={275}/>
					</View>
					</View>
					</ScrollView>
					
					
				</TouchableWithoutFeedback>
				
				</ImageBackground>
				</View>
			</Modal>
			);
	}
}

//<View height={((windowSize.height*1/10) * .9)} backgroundColor="grey" justifyContent="center" alignItems="flex-end">
//<TouchableOpacity style={styles.saveButtonCont} onPress={() => console.log('does nothing')}>
//		<Text style={styles.saveTxt}>SAVE</Text>
//</TouchableOpacity>
//</View>

const styles = ({
  textStyle: {
    fontFamily: 'SFProText-Light',
    color: 'rgb(115,115,115)',
    fontSize: 12
  },
  // input:{
  //   fontFamily: 'SFProText-Light',
  //   height: 40,
  //   width: windowSize.width * .85,
  //   color: 'rgb(115,115,115)',
  //   fontSize: 13
  //   //paddingHorizontal: 10
  // },
  input:{
    fontFamily: 'SFProText-Light',
    height: 37,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    //marginLeft: 10
    //paddingHorizontal: 10
  },
  inputBackground: {
    marginTop: 10,
    height: 37,
    width: windowSize.width * .85,
    backgroundColor: 'rgba(106,46,52,0.1)',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  input4Bio: {
  	fontFamily: 'SFProText-Light',
    height: 60,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    paddingLeft: 10,
  },
  inputBackground4Bio: {
  	marginTop: 10,
    height: 60,
    width: windowSize.width * .85,
    backgroundColor: 'rgba(106,46,52,0.1)',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1
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
    fontFamily: 'SFProText-Regular',
    // fontWeight: '300',
  }
});

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>