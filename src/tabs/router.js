import React from 'react';
import {Dimensions, Animated, Easing, View, Image, Button, Icon, ImageBackground, Text} from 'react-native';
import {TabNavigator, StackNavigator, DrawerNavigator, DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';

//import LogoutButton from './profile/LogoutButton';

import firebase from 'firebase';
import {connect} from 'react-redux';

import App from '../App';
import SplashScreen from './onboarding/splash_screen';
import OnboardScreen from './onboarding/onboarding_screen';
import LoginScreen from './onboarding/login_screen';
import SignupScreen from './onboarding/signup_screen';
import LogoutButton from './logoutbutton';

import FeedScreen from './feed/feed_screen';
import TweetScreen from './feed/tweet_screen';

import ProfileScreen from './profile/profile_screen';
// import LogoutScreen from './Login/logout_screen';

const windowSize = Dimensions.get('window');
const noTransitionConfig = () => ({
  transitionSpec: {
  	// duration: 5,
   //    easing: Easing.out(Easing.poly(4)),
   //    timing: Animated.step0,
    duration: 1,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

export const Splash_Stack = StackNavigator ({
	Splash: {
		screen: SplashScreen
	}
})

export const Onboard_Stack = StackNavigator ({
	Onboard: {
		screen: OnboardScreen,
    	navigationOptions: {
			headerStyle: {
				borderBottomWidth: 0,
				elevation: null
       		}
  		}	
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			headerVisible: false,
  		}
	},
	SignUp: {
		screen: SignupScreen,
		navigationOptions: {
			headerVisible: false,
  		}
	} 

}, {
	initialRouteName: 'Onboard',
	headerMode: 'none',
	navigationOptions: {
    	gesturesEnabled: false,
	}
});

const FeedStack = StackNavigator ({
	Feed: {
		screen: FeedScreen,
		navigationOptions: ({navigation}) => ({
			//headerBackgroundColor: 'maroon',
			headerBackground:
			<ImageBackground
				style={{
                flex: 1,
                //resizeMode,
                position: 'absolute',
                width: '105%',
                height: '105%',
                //alignItems: 'center',
              }}

              source={require('../../Images/background_splash.jpg')}

			/>,
			headerTitleStyle: {
			    //fontWeight: '300',
			    color: 'white',
			    fontFamily: 'HelveticaNeue-Medium',
			    fontSize: 19,
			    //marginRight:
  			},
			title: 'Feed',
			//size: 25,
			//headerTintColor: 'white',
			headerLeft: <Button title="menu" size={35} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>,
			headerStyle: {
				shadowOpacity: 1,
				shadowColor: '#010000',
				elevation: 1,
				shadowOffset: {
					width: 0,
					height: 5
				}
			}
			// headerLeft: 
			// 	<View flex={1} flexDirection="row">
			// 		<View justifyContent="center">
			// 		<Button title="menu" size={35} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
			// 		</View>
			// 	<Text style={styles.drawerTitle}>Feed</Text>
			// 	</View>

		})
	},
	// Tweet: {
	// 	screen: TweetScreen,
	// 	navigationOptions: ({navigation}) => ({
	// 		headerBackground: 
	// 		<ImageBackground
	// 			style={{
 //                flex: 1,
 //                //resizeMode,
 //                position: 'absolute',
 //                width: '105%',
 //                height: '100%',
 //                //alignItems: 'center',
 //              }}

 //              source={require('../../Images/background_splash.jpg')}

	// 		/>,
	// 		title: '',
	// 		headerTintColor: 'white',
	// 		headerLeft: <Button title="<" size={35} onPress={() => navigation.goBack()}/>
	// 		// headerLeft: 
	// 		// 	<View flex={1} flexDirection="row">
	// 		// 		<View justifyContent="center">
	// 		// 		<Button title="menu" size={35} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
	// 		// 		</View>
	// 		// 	<Text style={styles.drawerTitle}>Feed</Text>
	// 		// 	</View>

	// 	})
	// }
})

const ProfileStack = StackNavigator ({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: ({navigation}) => ({
			headerBackground: 
			<ImageBackground
				style={{
                flex: 1,
                //resizeMode,
                position: 'absolute',
                width: '105%',
                height: '100%',
                //alignItems: 'center',
              }}

              source={require('../../Images/background_splash.jpg')}

			/>,
			title: 'Profile',
			headerTintColor: 'white',
			headerLeft: <Button title="menu" size={35} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>

		})
	}
})

// export const FFBusStack = StackNavigator ({
// 	Bubble: {
// 		screen: BubbleScreen,
// 		navigationOptions: {
// 			headerTitle:
// 				<Image source = {require('../../Images/foundry-logo-top-bar.png')}
// 				 style = {{height:40, width: 190, marginBottom: 20}}/>
// 				,
// 			headerStyle: {
//        			backgroundColor: '#f7f7f8',
//        			elevation: null
//        		},
//        		headerTitleStyle: {
//   				fontSize: 20

  				
//   			},
//   			headerBackStyle: {
//   				color: 'red'
//   			},
// 	},
// },
// 	FFBus: {
// 		screen: FFBusScreen,
// 		navigationOptions: {
// 			headerTitle: 'Foundry Businesses',
// 			headerStyle: {
//        			backgroundColor: '#f7f7f8',
//        			elevation: null
//        		},
//        		headerTitleStyle: {
//        			width: 214,
//   				fontSize: 25,
//   				fontFamily: 'GillSans',
//   				color: 'black',
//   				paddingBottom: 20
//   			},
//   			headerTintColor: 'maroon'
//   		}
// 	}     		    		
// });

// export const JobStack = StackNavigator ({
// 	Jobs: {
// 		screen: JobScreen,
// 		navigationOptions: {
// 			headerTitle: 
// 			<View>
// 			<View flex = {1} justifyContent = 'center' flexDirection = 'row' marginBottom = {60}>
// 			<Image source = {require('../../Images/foundry-logo-top-bar.png')} 
// 				style = {{height:40, width: 190}}/>
// 			</View>
// 			</View>,
// 			headerStyle: {
//        			backgroundColor: '#f7f7f8',
//        			elevation: null
//        		},
//        		headerTitleStyle: {
//   				fontSize: 20	
//   			},
//   			headerBackStyle: {
//   				color: 'red'
//   			},
  			
  			
//   		},
//   	},

//   	JCForm: {
//   		screen: JobCreate,
// 		navigationOptions: {
// 			headerTitle: <Image source = {require('../../Images/foundry-logo-top-bar.png')} 
// 				style = {{height:40, width: 150, marginBottom: 20}}/>,
// 			headerStyle: {
//        			backgroundColor: '#f7f7f8',
//        			elevation: null
//        		},
//        		headerTitleStyle: {
//        			width: 214,
//   				fontSize: 20,
//   				fontFamily: 'GillSans',
//   				color: 'black',
//   				paddingBottom: 20
//   			},
//   			headerTintColor: 'maroon'
//   		}
//   	}	
// });

const SideDrawer = (props) => {

	const userEmail = firebase.auth().currentUser.email;

	return (
	<View flex={1}>
		<View flexDirection="column">
			<View marginTop={40} marginLeft={18}>
				<View style={styles.profPic}>
			</View>
			<View marginTop={20}>
				<View><Text>NAME</Text></View>
			<View><Text>{userEmail}</Text></View>
			</View>
			</View>
			<View marginTop={50} borderWidth={1} borderColor='black'/>
				<View marginTop={20}>
					<DrawerItems {...props}/>
				</View>
			<View alignItems="flex-start" marginLeft={16} marginTop={10}>
				<LogoutButton {...props} />
			</View>
		</View>
	</View>
	);
};

const DrawerRoutes = {
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      title: 'Feed',
      //drawerIcon: //Icon goes here
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      title: 'Profile',
      //drawerIcon: //Icon goes here
    },
  }
};

const DrawerOptions = {
  initialRouteName: 'Feed',
  contentComponent: SideDrawer,
};

const Drawer = DrawerNavigator(DrawerRoutes, DrawerOptions);

// export const DrawerNavigation = StackNavigator({
// 	DrawerStack: { screen: FoundryApp_DrawerStack},
// },
// 	{
// 		headerMode: 'float',
		// navigationOptions: ({navigation}) => ({
		// 	// headerBackground: 
		// 	// <ImageBackground
		// 	// 	style={{
  //  //              flex: 1,
  //  //              //resizeMode,
  //  //              position: 'absolute',
  //  //              width: '105%',
  //  //              height: '100%',
  //  //              //alignItems: 'center',
  //  //            }}

  //  //            source={require('../../Images/background_splash.jpg')}

		// 	// />,
		// 	headerLeft: <Button title="menu" size={35} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
		// })
// 	}
// )

export const AppStack = StackNavigator ({
	Splash: {
		screen: SplashScreen
	},
	SignedIn: {
		screen: Drawer,
	},
	SignedOut: {
		screen: Onboard_Stack,
	},
},
	{
		initialRouteName: 'Splash',
		headerMode: "none",
		transitionConfig: noTransitionConfig,
		//mode: "modal",
		navigationOptions: {
        	gesturesEnabled: false,
    	}
	}
);

const styles = ({
	navBarView: {
		height: 64,
	},
	titleStyle: {
		flex:1,
		justifyContent: 'center',
		marginTop: 12,
		flexDirection: 'row',
		
	},
	infoButton: {
		marginRight: 80,
		marginBottom: 12,
    	flexDirection: 'row',
    	alignItems: 'center',
    	justifyContent: 'flex-end',
	},
	drawerTitle: {
		color: 'white'
	},
	profPic: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'grey'
	}
})

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    // password: state.auth.password,
    // error: state.auth.error,
    // loading: state.auth.loading,
    //loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(SideDrawer)