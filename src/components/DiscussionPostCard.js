import React, {Component} from 'react';
import {Dimensions, Linking, ImageBackground, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {MaterialIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import FavoriteButton from './FavoriteButton';

const windowSize = Dimensions.get('window');
export default class DiscussionPostCard extends Component {

	render() {
		const styles =({
			encompCont: {
				//alignItems:"center",
				marginTop: 20,
				//flex: 1,
				alignItems: 'center',
				backgroundColor: '#dbd1ce',
				borderRadius: 8,
	            width: windowSize.width*.9,
	            shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowOffset: {
					width: 0,height: 2
				},			
				shadowRadius: 4,
				shadowOpacity: 1,
			},
			profPic: {
				width: 60,
				height: 60,
				borderRadius: 30,
				marginRight: 14,
				justifyContent: 'center',
				alignItems: 'center'
			},
			nameStyle: {
				fontFamily: 'SFProText-Regular',
				fontSize: 15,
				color: 'rgb(115,115,115)'
			},
			headlineStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 13,
				color: 'rgb(115,115,115)'
			},
			locationStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 13,
				color: 'rgb(115,115,115)'
			},
			bioStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 14,
				color: 'rgb(115,115,115)',
				//textAlign: 'center'
			},
			gradientCont: {
				flex: 1,
				backgroundColor: 'red',
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowOffset: {
					width: 0,height: 2
				},
				//height: 300,
				shadowRadius: 4,
				shadowOpacity: 1,
				width: windowSize.width * .9,
			}

		})
		
		return (
			<View style={styles.encompCont}>				
		        <View flexDirection="column" padding={20}>
					<View flexDirection="row">
						<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
                            <Text style={{fontFamily: 'SFProText-Light', fontSize: 24, color: 'rgb(255,255,255)'}}>Sample Text</Text>
                        </LinearGradient>
						<View flexDirection="row">
							<View justifyContent = "center" flexDirection="column">
								<Text style={styles.nameStyle}>Sample Text</Text>
								<Text style={styles.headlineStyle}>Sample Text</Text> 
							</View>
						</View>
					</View>
					<View paddingHorizontal={2}>
					<View paddingRight={25}>
						<Text style={styles.bioStyle}>Sample Text</Text> 
					</View>
					<View marginTop={5}>
						<TouchableOpacity onPress={() => console.log('do nothing')}>
							<MatIcon name="mail-outline" size={25} color="rgb(106,46,52)"/>
						</TouchableOpacity> 
					</View>
					</View>
				</View>								
			</View>
		)
	}
}


const styles2 = ({
	loadingOverlay: {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 0,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'rgba(0,0,0,0.3)'
   }
})