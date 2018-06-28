import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
export default class DBMainCard extends Component {

	render() {
		return (
			<View style={styles.encompCont}>
				<View paddingTop={15} paddingLeft={24} flexDirection="row">
					<View marginRight={8}>
						<View height={30} width={30} borderRadius={15} backgroundColor="blue"/>
					</View>
					<View flex={1} flexDirection="column">
						<Text style={styles.titleTxtStyle}>Sample Text</Text>
						<Text style={styles.headerTxtStyle}>Sample Text</Text>
					</View>
				</View>
				<View paddingLeft={24} marginTop={10}>
					<Text style={styles.descTxtStyle}>SAMPLE TEXT</Text>
				</View>
				<View paddingLeft={10} alignItems="flex-start">
					<Text style={styles.commentTxtStyle}>Time Text</Text>
				</View>
				<View marginVertical={10} paddingRight={10} alignItems="flex-end">
					<Text style={styles.commentTxtStyle}># Comments</Text>
				</View>
				<View flex={1} borderBottomWidth={1} borderColor="rgb(190, 187, 191)"/>
				<View flexDirection="row">
					<View justifyContent="center" marginTop={10} marginBottom={10} marginLeft={28} shadowOpacity={0.3} shadowRadius={1} shadowOffset={{width: 0, height: 1}}>
						<TouchableOpacity onPress={() => console.log("do nothing")}>
							<View style={styles.buttonStyle}>
								<Text style={styles.buttonTextStyle}>
								Comment
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View flex={1} justifyContent="center" paddingRight={10} alignItems="flex-end">
						<Text style={styles.discussionTypeTxtStyle}>Sample Text</Text>
					</View>
				</View>
			</View>
			
		)
	}
}

//<Button title="favor" onPress={this.props.handleFavorites}/>

const styles = ({
	encompCont: {
		//flex: 1,
		backgroundColor: 'rgba(106, 46, 52, 0.1)',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: windowSize.width * .9,
		//borderWidth: 0.2,
		borderRadius: 6,
		borderWidth: 0.3,
		borderBottomWidth: 2,
		borderColor: 'darkgrey'
		//elevation: 1,
    	//shadowOpacity: 0.8,
		//shadowOpacity: 1
		//shadowOpacity: 0
		//shadowRadius: 1
	},
	imageContainer: {
		flex: 1,
		height: 200,
		//width: windowSize.width * .75//344
	},
	titleTxtStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Regular',
		color: 'rgb(115, 115, 115)'
	},
	headerTxtStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115, 115, 115)'
	},
	descTxtStyle: {
		fontSize: 20,
		fontFamily: 'SFProText-Regular',
		color: 'rgb(115, 115, 115)'
	},
	commentTxtStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115, 115, 115)'
	},
	discussionTypeTxtStyle: {
		fontSize: 12,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115, 115, 115)'
	},
	buttonStyle: {
		width: 100,
		height: 30,
		paddingVertical: 7,
		paddingHorizontal: 16,
		borderRadius: 10,
		backgroundColor: 'rgb(0, 122, 255)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTextStyle: {
	    alignSelf: 'center',
	    color: 'white',
	    fontSize: 15,
	    fontFamily: 'HelveticaNeue-Medium',
	}
})