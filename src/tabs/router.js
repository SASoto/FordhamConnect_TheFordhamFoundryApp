import React from 'react';
import {Dimensions, Animated, Easing, View, Image, Button, Icon, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator, TabNavigator, createDrawerNavigator, DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';

import  MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import MenuButton from '../components/MenuButton';
//import EntIcon from 'react-native-vector-icons/dist/Entypo';
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

import DiscBoardScreen from './discboard/discboard_screen';

import ChatScreen from './chat/chat_screen';

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

export const Splash_Stack = createStackNavigator ({
	Splash: {
		screen: SplashScreen
	}
})

export const Onboard_Stack = createStackNavigator ({
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

const FeedStack = createStackNavigator ({
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
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>,
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
	}
})

const ProfileStack = createStackNavigator ({
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
			headerLeft:
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>

		})
	}
})

const DiscussionStack = createStackNavigator ({
	DiscussionBoard: {
		screen: DiscBoardScreen,
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
			title: 'Discussion Board',
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>

		})

	}
})

const ChatStack = createStackNavigator ({
	Chat: {
		screen: ChatScreen,
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
			title: 'Chat',
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>

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
			<View marginTop={50} borderTopWidth={1} borderColor='grey'/>
				<View marginTop={20}>
					<DrawerItems {...props}/>
				</View>
			<TouchableOpacity style={styles.logoutCont}>
				<LogoutButton {...props} />
			</TouchableOpacity>
		</View>
	</View>
	);
};

const DrawerRoutes = {
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      title: 'Feed',
      drawerIcon: <MatIcon name="home" size={20} color="grey"/> //Icon goes here
    },
  },
  Network: {
    screen: ProfileStack,
    navigationOptions: {
      title: 'Network',
      drawerIcon: <MatIcon name="people" size={20} color="grey"/>//Icon goes here
    },
  },
  DiscussionBoard: {
  	screen: DiscussionStack,
  	navigationOptions: {
      title: 'Discussion Board',
      drawerIcon: <MatIcon name="dashboard" size={20} color="grey"/>
    },
  },
  Chat: {
  	screen: ChatStack,
  	navigationOptions: {
      title: 'Messages',
      drawerIcon: <MatIcon name="email" size={20} color="grey"/>//Icon goes here
    },
  }
};

const DrawerOptions = {
  initialRouteName: 'Network',
  contentComponent: SideDrawer,
};

const Drawer = createDrawerNavigator(DrawerRoutes, DrawerOptions);

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

export const AppStack = createStackNavigator ({
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
	},
	logoutCont: {
		alignItems: "flex-start",
		marginLeft: 16,
		marginTop: 10
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