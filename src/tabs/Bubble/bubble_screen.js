import React, {Component} from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity, Linking} from 'react-native';

import ViewContainer from '../../Components/Common/ViewContainer';
import Panel from '../../Components/Common/Panel';
import PanelToView from '../../Components/Common/PanelToView';
import MediaButtons from '../../Components/Common/MediaButtons';
import {ClickMe} from '../../Components/Common';

import ImageSlider from 'react-native-image-slider';

class bubble_screen extends Component {
	constructor (props){
		super(props);

		this.state = { 
			position: 0,
			interval: null,
			images: []
		};
	}

	componentWillMount(){
		this.setState({interval: setInterval(() => {
			this.setState({position: this.state.position === 3 ? 0 : this.state.position +1});
		}, 6000)});

		var array = [require('../../../Images/slide2.png'),
					require('../../../Images/slide1.png'),
					require('../../../Images/slide3.png'),
					require('../../../Images/slide4.png')]

		this.setState({images: array})
	}

	componentWillUnmount(){
		clearInterval(this.state.interval)
	}

	render () {
		return (
			<ViewContainer>
			<ScrollView style = {styles.container}>
			<ImageSlider 
					height = {180}
					images = {this.state.images}
					position = {this.state.position}
					onPositionChanged = { position => this.setState({position})}/>
			<Panel title = "What is the Foundry?">
				<Text style = {styles.messageT}>The Foundry is Fordham University’s business and idea incubator,
				open to students, alumni, community, and the entrepreneurial organisations
				they are part of. Students develop their skills and gain practical experience by working on student
				ventures or by starting ventures of their own. As entrepreneurs, they can create, refine and grow 
				their ideas moving from ideation to Impact . On-sight experts in a variety of fields provide consultation, 
				advising, and mentorship in a vibrant co-working space. Speaker events allow students to learn from others,
				but more importantly from each other.  </Text>
			</Panel>
			<Panel title = "You have a great business idea. Now what?">
				<Text style = {styles.messageT}> Let us help you take your idea to the next level! </Text>
				<Text style = {styles.messageT}> We offer: </Text>
				<Text style = {styles.messageT}>{'	\u2022Mentorship and consulting\n	\u2022Speakers, workshops, and other events\n	\u2022Legal assistance via the\n	(Fordham Entrepreneurial Law Clinic)\n	\u2022And more!'} </Text>
				<Text style = {styles.lastOne} fontWeight = "bold"> Tell us about your ideas using our email address down below.</Text>
			</Panel>
			<PanelToView title = "Foundry Businesses" wayto = {this.props.navigation}/>
			<Panel title = "Business Partners">
				<View style = {styles.businessP}>
				<ClickMe onPress = {() => Linking.openURL('https://group.bnpparibas/en/group/corporate-social-responsibility')}>
				<Image
					source = {require('../../../Images/bnp-paribas.png')}
					style = {{height:40, width: 135}}
				/>
				</ClickMe>
				<ClickMe onPress = {() => Linking.openURL('http://thecenter.nasdaq.org')}>
				<Image
					source = {require('../../../Images/nasdaq.png')}
					style = {{height:40, width: 135}}
				/>
				</ClickMe>
				</View>
				<View style = {styles.businessP}>
				<ClickMe onPress = {() => Linking.openURL('https://www1.nyc.gov/nycbusiness/topicpage/support-for-businesses#topic7')}>
				<Image
					source = {require('../../../Images/nycbusiness.png')}
					style = {{height:40, width: 135}}
				/>
				</ClickMe>
				<ClickMe onPress = {() => Linking.openURL('https://www.fordham.edu/info/23746/social_innovation_collaboratory')}>
				<Image
					source = {require('../../../Images/socialc.png')}
					style = {{height:15, width: 130}}
				/>
				</ClickMe>
				</View>
			</Panel>
			<View alignItems = 'center' justifyContent = 'center'>
				<Text style = {styles.addressText}> 557 East Fordham Road, 2nd Floor, Bronx, NY 10458 </Text>
			</View>
			</ScrollView>
			<MediaButtons/>
			</ViewContainer>

			);
	}
}

const styles = ({
	container: {
		flex : 1
	},
	addressText: {
		marginTop: 20,
		marginBottom: 20,
		fontSize: 14,
		fontFamily: "GillSans-Light"

	},
	messageT: {
		fontSize: 18,
		fontFamily: "GillSans-Light"
	},
	lastOne: {
		paddingTop: 10,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: 'center'
	},
	lastTwo: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: 'center'
	},
	businessP: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 8
	},
	dandmP: {
		alignItems: 'center',
		
	},
	dandmT: {
		fontSize: 11,
		textAlign: 'center'
	}
});
 

export default bubble_screen;