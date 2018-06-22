import React, {Component} from 'react';
import {Dimensions, Animated, Easing, View, Image, Button, Icon, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {TabNavigator, createStackNavigator, createTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator, DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import MenuButton from '../components/MenuButton';
import BackButton from '../components/BackButton';

import CustomTabBarTop from './home/CustomTabBarTop';
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

import MainViewScreen2 from './home/mainview_screen2';

import ProfileScreen from './profile/profile_screen';

import FeedScreen from './feed/feed_screen';
import TweetScreen from './feed/tweet_screen';
// import LogoutScreen from './Login/logout_screen';

import ContactListScreen from './network/contacts_screen'
import ContactProfileScreen from './network/contactprofile_screen'

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
	// Onboard: {
	// 	screen: OnboardScreen,
 //    	navigationOptions: {
	// 		headerStyle: {
	// 			borderBottomWidth: 0,
	// 			elevation: null
 //       		}
 //  		}	
	// },
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
	initialRouteName: 'Login',
	headerMode: 'none',
	navigationOptions: {
    	gesturesEnabled: false,
	}
});

// const MainStack = createStackNavigator ({

// 	MainView: {
// 		screen: MainViewScreen,
// 		navigationOptions: ({navigation}) => ({
// 			//headerBackgroundColor: 'maroon',
// 			headerBackground:
// 			<ImageBackground
// 				style={{
//                 flex: 1,
//                 //resizeMode,
//                 position: 'absolute',
//                 width: '105%',
//                 height: '105%',
//                 //alignItems: 'center',
//               }}

//               source={require('../../Images/background_splash.jpg')}

// 			/>,
// 			headerTitleStyle: {
// 			    //fontWeight: '300',
// 			    color: 'white',
// 			    fontFamily: 'HelveticaNeue-Medium',
// 			    fontSize: 19,
// 			    //marginRight:
//   			},
// 			title: 'Home',
// 			//size: 25,
// 			//headerTintColor: 'white',
// 			headerLeft: 
// 				<View paddingLeft={5}>
// 					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
// 				</View>,
// 			headerStyle: {
// 				shadowOpacity: 1,
// 				shadowColor: '#010000',
// 				elevation: 1,
// 				shadowOffset: {
// 					width: 0,
// 					height: 5
// 				}
// 			}
// 			// headerLeft: 
// 			// 	<View flex={1} flexDirection="row">
// 			// 		<View justifyContent="center">
// 			// 		<Button title="menu" size={35} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
// 			// 		</View>
// 			// 	<Text style={styles.drawerTitle}>Feed</Text>
// 			// 	</View>

// 		})
// 	}
// })

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
		//ADDED THIS ==> TO REVER UNCOMMENT CODE BELOW
		navigationOptions: {
			header: null
		}
		// navigationOptions: ({navigation}) => ({
		// 	headerBackground:
		// 	<ImageBackground
		// 		style={{
  //               flex: 1,
  //               position: 'absolute',
  //               width: '105%',
  //               height: '105%',
  //             }}

  //             source={require('../../Images/background_splash.jpg')}

		// 	/>,
		// 	headerTitleStyle: {
		// 	    color: 'white',
		// 	    fontFamily: 'HelveticaNeue-Medium',
		// 	    fontSize: 19,
  // 			},
		// 	title: 'Feed',
		// 	//size: 25,
		// 	//headerTintColor: 'white',
		// 	headerLeft: 
		// 		<View paddingLeft={5}>
		// 			<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
		// 		</View>,
		// 	headerStyle: {
		// 		shadowOpacity: 1,
		// 		shadowColor: '#010000',
		// 		elevation: 1,
		// 		shadowOffset: {
		// 			width: 0,
		// 			height: 5
		// 		}
		// 	}
		// })
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

const NetworkStack = createStackNavigator ({
	ContactList: {
		screen: ContactListScreen,
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
			title: 'Fordham Contacts',
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
					<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
				</View>

		})
	},
	ContactProfile: {
		screen: ContactProfileScreen,
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
			title: 'Contact Profile',
			headerTintColor: 'white',
			headerLeft: 
				<View paddingLeft={5}>
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
	}
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
	// 		title: 'Discussion Board',
	// 		headerTintColor: 'white',
	// 		headerLeft: 
	// 			<View paddingLeft={5}>
	// 				<MenuButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
	// 			</View>

	// 	})

	// }
})

export const ChatStack = createStackNavigator ({
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

/*createMaterialTopTabNavigator*/ 
export const MainViewTabNav = createMaterialTopTabNavigator ({
// 	Discussion: DiscussionStack,
// 	News: FeedStack
// },
//  {	
//  	initialRouteName: "Discussion",
//  	// navigationOptions: ({ navigation }) => {
//   //     const { routeName, routes } = navigation.state;
//   //   },
//  	tabBarComponent: props => <CustomTabBarTop {...props}/>,
//     tabBarOptions: {
// 		upperCaseLabel: false,
// 		labelStyle: {
// 			fontSize: 14,
// 			fontFamily: 'HelveticaNeue-Medium',
// 			color: '#737373',
// 			//activeTintColor: 'red'

// 		},
// 		tabStyle: {
// 			height: 50,
// 			width: 110,

// 		},
// 		indicatorStyle: {
// 			backgroundColor: 'rgb(0, 122, 255)'
// 		},
// 		style: {
// 			backgroundColor: 'rgb(221, 215, 218)',
// 			//activeTintColor: 'red'
// 		},
// 	}

//  }

	Discussion: {
		screen: DiscussionStack,
		// navigationOptions: ({ navigation }) => ({
		// 	// gesturesEnabled: false,
		// 	tabBarOnPress: ({ navigation, defaultHandler }) => {
		//         // perform your logic here
		//         // this is mandatory to perform the actual switch
		//         // you can omit this if you want to prevent it
		//         console.log("WTF3")
		//         navigation.navigate('DiscussionBoard');
		//         //jumpToIndex(1);
	 //        }
		// })
	},
	News: {
		screen: FeedStack,
		// navigationOptions: ({ navigation }) => ({
		// 	// gesturesEnabled: false,
		// 	tabBarOnPress: ({ navigation, defaultHandler }) => {
		//         // perform your logic here
		//         // this is mandatory to perform the actual switch
		//         // you can omit this if you want to prevent it
		//         console.log("WTF3")
		//         navigation.navigate('Feed');
		//         this.defaultHandler.state.
		//         //jumpToIndex(1);
	 //        }
		// }),
	},
},
	{
		initialRouteName: 'News',
		// navigationOptions: {
		// 	swipeEnabled: false
		// },
		//tabBarComponent: props => <CustomTabBarTop {...props}/>,
		tabBarOptions: {
			//activeTintColor: 'red',
			//margin: 0,
			upperCaseLabel: false,
			labelStyle: {
				fontSize: 14,
				fontFamily: 'HelveticaNeue-Medium',
				color: '#737373',
				//activeTintColor: 'red'

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
				//activeTintColor: 'red'
			},
		}
	}

)

const MainStack = createStackNavigator ({
	MainView: {
		screen: MainViewScreen2,
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
			title: 'Home',
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

class SideDrawer extends Component {
	// const userEmail = firebase.auth().currentUser.email;
	render() {
		console.log("IS THE USER LOGGEDIN? ",this.props.loggedIn)
		console.log("THE USER THAT JUST LOGGED IN: ", this.props.user)
		console.log("IS THE USER STILL LOADING: ", this.props.loading)
		const userEmail = this.props.email;
		console.log("USER EMAIL: ", userEmail);
			
		const userFName = this.props.firstname;
		console.log("USER FIRSTNAME: ",userFName)
		const userLName = this.props.lastname;
		console.log("USER LASTNAME: ",userLName)
		//#5B1728
	return (
	<View flex={1} backgroundColor="#5B1728">
		<SafeAreaView flexDirection="column">
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
				<View flexDirection="column" marginLeft={18}>
					<View marginTop={40}>
						<View style={styles.profPic}/>
					</View>
					
				</View>
			</TouchableOpacity>
			<View marginTop={50} borderTopWidth={1} borderColor='grey'/>
				<SafeAreaView marginTop={20}>
					<DrawerItems 
					{...this.props}
					//items={items.filter((item) => item.routeName !== 'Profile')}
					/>
				</SafeAreaView>
			<TouchableOpacity style={styles.logoutCont}>
				<LogoutButton {...this.props} />
			</TouchableOpacity>
		</SafeAreaView>
	</View>
	);
	}
};

const DrawerRoutes = {
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
    	drawerLabel: () => null,
    }
    
  },
  MainView: {
  	screen: MainStack,
  	navigationOptions: {
      title: 'Feed',
      drawerIcon: <MatIcon name="home" size={20} color="white"/> //Icon goes here
    },
  },
  // MainView: {
  // 	screen: MainStack,
  // 	navigationOptions: {
  //     title: 'TheBoogieMan',
  //     drawerIcon: <MatIcon name="remove-red-eye" size={20} color="grey"/> //Icon goes here
  //   },
  // },
  // Feed: {
  //   screen: FeedStack,
  //   navigationOptions: {
  //     title: 'Feed',
  //     drawerIcon: <MatIcon name="home" size={20} color="grey"/> //Icon goes here
  //   },
  // },
  Network: {
    screen: NetworkStack,
    navigationOptions: {
      title: 'Network',
      drawerIcon: <MatIcon name="people" size={20} color="white"/>//Icon goes here
    },
  },
 // DiscussionBoard: {
  //	screen: DiscussionStack,
  //	navigationOptions: {
   //   title: 'Discussion Board',
  //    drawerIcon: <MatIcon name="dashboard" size={20} color="white"/>
 //   },
 // },
  Chat: {
  	screen: ChatStack,
  	navigationOptions: {
      title: 'Messages',
      drawerIcon: <MatIcon name="email" size={20} color="white"/>//Icon goes here
    },
  },
};

const DrawerOptions = {
  initialRouteName: 'MainView',
  contentComponent: SideDrawer,
  contentOptions: {
  	activeTintColor: 'white',
  	inactiveTintColor: 'lightgrey',
	  labelStyle: {
	    fontFamily: 'HelveticaNeue-Light',
	    //color: 'grey',
	    //activeTintColor: 'white',
	  },
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
		width: 76,
		height: 76,
		borderRadius: 38,
		backgroundColor: 'grey'
	},
	logoutCont: {
		alignItems: "flex-start",
		marginLeft: 16,
		marginTop: 10
	}
})

const mapStateToProps = (state) => {
  return {
  	firstname: state.auth.firstname,
  	lastname: state.auth.lastname,
    email: state.auth.email,
    user: state.auth.user,
    // password: state.auth.password,
    // error: state.auth.error,
    // loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(SideDrawer)