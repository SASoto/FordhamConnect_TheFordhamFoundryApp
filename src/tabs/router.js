import React, {Component} from 'react';
import {Dimensions, Animated, Easing, Modal, View, Image, Button, Icon, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {Header, TabNavigator, createStackNavigator, createTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator, DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import MenuButton from '../components/MenuButton';
import BackButton from '../components/BackButton';

//import CustomTabBarTop from './home/CustomTabBarTop';

import {connect} from 'react-redux';
import firebase from 'firebase';

import App from '../App';
import SplashScreen from './onboarding/splash_screen';
import OnboardScreen from './onboarding/onboarding_screen';
import LoginScreen from './onboarding/login_screen';
import ForgotPassScreen from './onboarding/forgotpassword_screen';
import SignupScreen from './onboarding/signup_screen';
import ExtraInfoScreen from './onboarding/extrainfo_screen';
import LogoutButton from './logoutbutton';

import DrawerNavigatorComp from './drawernavigator';
import MainViewScreen2 from './home/mainview_screen2';

import ProfileModal from './profilemodal';
import ProfileScreen from './profile/profile_screen';

import FeedScreen from './feed/feed_screen';

import FoundryScreen from './foundry/foundry_screen';
import FoundryEventsScreen from './foundry/foundryevents_screen';
import FoundryAboutScreen from './foundry/foundryabout_screen';
import FoundryConnectScreen from './foundry/foundryconnect_screen';

import TweetScreen from './feed/tweet_screen';

import ContactListScreen from './network/contacts_screen'
import ContactProfileScreen from './network/contactprofile_screen'

import DiscBoardScreen from './discboard/discboard_screen';
//import SinglePostScreen from './discboard/singlepost_screen';

import ChatScreen from './chat/chat_screen';

import SettingsScreen from './settings/settings_screen';
import SettingsForgotPasswordScreen from './settings/forgotpassword_screen';

const windowSize = Dimensions.get('window');
const noTransitionConfig = () => ({
  transitionSpec: {
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
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			headerVisible: false,
  		}
	},
	ForgotPass: {
		screen: ForgotPassScreen,
		navigationOptions: {
			headerVisible: false
		}
	},
	SignUp: {
		screen: SignupScreen,
		navigationOptions: {
			headerVisible: false,
  		}
	},

}, {
	initialRouteName: 'SignUp',
	headerMode: 'none',
	navigationOptions: {
    	gesturesEnabled: false,
	}
});

export const DummyFeedStack = createStackNavigator ({
	Feed: {
		screen: FeedScreen,
		navigationOptions: {
			header: null
		}
	}
})

export const FeedStack = createStackNavigator ({
	Feed: {
		screen: FeedScreen,
		navigationOptions: {
			header: null
		}
	}
})

export const FoundryEventsStack = createStackNavigator ({
	Events: {
		screen: FoundryEventsScreen,
		navigationOptions: {
			header: null
		}
	}
})

export const FoundryAboutStack = createStackNavigator ({
	About: {
		screen: FoundryAboutScreen,
		navigationOptions: {
			header: null
		}
	}
})

export const FoundryConnectStack = createStackNavigator ({
	Connect: {
		screen: FoundryConnectScreen,
		navigationOptions: {
			header: null
		}
	}
})

const NetworkStack = createStackNavigator ({
	ContactList: {
		screen: ContactListScreen,
		navigationOptions: ({navigation}) => ({
			headerBackground: 
			<ImageBackground
				resizeMode="cover"
				style={{
                flex: 1,             
                position: 'absolute',
                width: '100%',
                height: '101%',                
              }}

              source={require('../../Images/launchscreenblur.png')}

			/>,
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>,
			headerStyle: {
				shadowOpacity: 1,
				shadowColor: '#010000',				
				shadowOffset: {
					width: 0,
					height: 2
				}
			}

		})
	},
	ContactProfile: {
		screen: ContactProfileScreen,
		navigationOptions: ({navigation}) => ({
			headerBackground: 
			<ImageBackground
				resizeMode="cover"
				style={{
                flex: 1,                
                position: 'absolute',
                width: '100%',
                height: '101%',                
              }}

              source={require('../../Images/launchscreenblur.png')}

			/>,			
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={30}>
					<BackButton onPress={() => navigation.goBack()}/>
				</View>
		})
	}
})

export const DiscussionStack = createStackNavigator ({
	DiscussionBoard: {
		screen: DiscBoardScreen,
		navigationOptions: {
			header: null
		}
	},
})

export const ChatStack = createStackNavigator ({
	Chat: {
		screen: ChatScreen,
		navigationOptions: ({navigation}) => ({
			headerBackground: 
			<ImageBackground
				resizeMode="cover"
				style={{
                flex: 1,
                position: 'absolute',
                width: '101%',
                height: '101%',
              }}

              source={require('../../Images/launchscreenblur.png')}

			/>,			
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>
		})
	}
})

export const SettingsStack = createStackNavigator ({
	Settings: {
		screen: SettingsScreen,
		navigationOptions: ({navigation}) => ({
			headerBackground: 
			<ImageBackground
				resizeMode="cover"
				style={{
                flex: 1,                
                position: 'absolute',
                width: '101%',
                height: '101%',                
              }}

              source={require('../../Images/launchscreenblur.png')}

			/>,			
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>,
			headerStyle: {
				shadowOpacity: 1,
				shadowColor: '#010000',
				shadowOffset: {
					width: 0,
					height: 2
				}
			}

		})
	}
})

/*createMaterialTopTabNavigator*/ 
export const MainViewTabNav = createMaterialTopTabNavigator ({
	News: {
		screen: FeedStack,
	},
	Events: {
		screen: FoundryEventsStack,
	},
	Discussion: {
		screen: DiscussionStack,
	},
	About: {
		screen: FoundryAboutStack,
	}
},
	{
		initialRouteName: 'News',
		tabBarOptions: {
			activeTintColor: 'rgb(106,46,52)',
			inactiveTintColor: 'rgb(115,115,115)',
			scrollEnabled: true,
			upperCaseLabel: false,
			labelStyle: {
				fontSize: 14,
				fontFamily: 'SFProText-Regular',				
			},
			tabStyle: {
				height: 50,
				width: 105,

			},
			indicatorStyle: {
				height: 4,
				backgroundColor: 'rgb(106,46,52)'
			},
			style: {
				backgroundColor: 'rgb(221, 215, 218)',
			},
		}
	}

)

export const FoundryTabNav = createMaterialTopTabNavigator ({
	Events: {
		screen: FoundryEventsStack,
	},
	About: {
		screen: FoundryAboutStack,
	},
	Connect: {
		screen: FoundryConnectStack
	}
},
	{
		initialRouteName: 'Events',
		tabBarOptions: {			
			scrollEnabled: true,
			upperCaseLabel: false,
			labelStyle: {
				fontSize: 14,
				fontFamily: 'SFProText-Regular',
				color: '#737373',				
			},
			tabStyle: {
				height: 50,
				width: 110,

			},
			indicatorStyle: {
				backgroundColor: 'rgb(0, 122, 255)'
			},
			style: {
				backgroundColor: 'rgb(221, 215, 218)',				
			},
		}
	}

)



const MainStack = createStackNavigator ({
	MainView: {
		screen: MainViewScreen2,
		navigationOptions: ({navigation}) => ({
			headerBackground:
			<ImageBackground
				resizeMode='cover'
				style={{
					flex: 1,
					position: 'absolute',
					width: '101%',
					height: '101%',
				}}

              source={require('../../Images/launchscreenblur.png')}

			/>,
			headerTitleStyle: {			 
			    color: 'white',
			    fontFamily: 'SFProText-Regular',
			    fontSize: 19,			    
  			},
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>,
			headerStyle: {
				shadowOpacity: 1,
				shadowColor: '#010000',
				shadowOffset: {
					width: 0,
					height: 2
				}
			}

		})
	}
})

const FoundryStack = createStackNavigator ({
	Foundry: {
		screen: FoundryScreen,
		navigationOptions: ({navigation}) => ({
			headerBackground:
			<ImageBackground
				resizeMode='cover'
				style={{
					flex: 1,
					position: 'absolute',
					width: '101%',
					height: '101%',
				}}

              source={require('../../Images/launchscreenblur.png')}

			/>,
			headerTitleStyle: {
			    color: 'white',
			    fontFamily: 'SFProText-Regular',
			    fontSize: 16,
  			},
			title: 'The Fordham Foundry',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>,
			headerStyle: {
				shadowOpacity: 1,
				shadowColor: '#010000',
				shadowOffset: {
					width: 0,
					height: 2
				}
			}
		})
	}
})




const DrawerRoutes = {
  // Profile: {
  //   screen: ProfileStack,
  //   navigationOptions: {
  //   	drawerLabel: () => null,
  //   }
    
  // },
  MainView: {
  	screen: MainStack,
  	navigationOptions: {
      title: 'theHub',
      drawerIcon: <MatIcon name="home" size={25} color="rgb(255,255,255)"/> //Icon goes here
    },
  },
  Network: {
    screen: NetworkStack,
    navigationOptions: {
      title: 'Network',
      drawerIcon: <MatIcon name="people" size={25} color="rgb(255,255,255)"/>//Icon goes here
    },
  },
  Settings: {
  	screen: SettingsStack,
  	navigationOptions: {
      title: 'Settings & Report',
      drawerIcon: <MatIcon name="settings" size={25} color="rgb(255,255,255)"/>//Icon goes here
    },
  },
};

const DrawerOptions = {
  initialRouteName: 'MainView',
  contentComponent: DrawerNavigatorComp,
  contentOptions: {
  	activeTintColor: 'rgb(255,255,255)',
  	activeBackgroundColor: 'transparent',
  	inactiveTintColor: 'lightgrey',
  	activeLabelStyle: {
  		fontFamily: 'SFProText-Bold',
  		fontSize: 15,
  		//color: 'rgb(255,255,255)'
  	},
  	inactiveLabelStyle: {
  		fontFamily: 'SFProText-Regular',
  		fontSize: 14,
  		//color: 'lightgrey'
  	}

	// labelStyle: {
	// 	//fontSize: 14,
	// 	//fontFamily: 'HelveticaNeue-Medium',//'SFProText-Regular',
	// 	color: 'rgb(255,255,255)',
	// //activeTintColor: 'white',
	// },
	  // itemsContainerStyle: {
	  //   marginVertical: 0,
	  // },
	  // iconContainerStyle: {
	  //   opacity: 1
	  // }
	}
};

const Drawer = createDrawerNavigator(DrawerRoutes, DrawerOptions);

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
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: 'grey'
	},
	accountInfoTxtStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		color: 'white'
	},
	logoutCont: {
		alignItems: "flex-start",
		marginLeft: 16,
		marginTop: 10
	}
})