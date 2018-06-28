import React, {Component} from 'react';
import {Dimensions, ImageBackground, Text, StyleSheet, View, TouchableOpacity, Linking} from 'react-native';

const windowSize = Dimensions.get('window');
export default class foundryconnect_screen extends Component {
	render () {
		return (
			<View flex={1}>
			<ImageBackground
	          resizeMode='cover'
	          style={{
	            flex: 1,
	            position: 'absolute',
	            width: '100%',
	            height: '100%',
	          }}

	            source={require('../../../Images/plussilvergradient.png')}
	        >
				<View height={2} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
				<View alignItems="center">
					<TouchableOpacity onPress={() => console.log('do nothing')}>
						<View style={styles.mediaButtonStyle} marginTop={44} backgroundColor="red">
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => console.log('do nothing')}>
						<View style={styles.mediaButtonStyle} marginTop={11} backgroundColor="blue">
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => console.log('do nothing')}>
						<View style={styles.mediaButtonStyle} marginTop={11} backgroundColor="green">
						</View>
					</TouchableOpacity>
				</View>
			</ImageBackground>
			</View>
			);
	}
}

const styles = ({
	mediaButtonStyle: {
		width: 222,
		height: 45,
		borderRadius: 8
	}
})

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>