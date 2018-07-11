import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground, View, Text, Image, SectionList, Button, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {Header} from 'react-navigation';

import StarredContactListItem from '../../components/StarredContactListItem';
import ContactListItem from '../../components/ContactListItem';
import CustomTabButton from '../../components/CustomTabButton';

import {MaterialIndicator} from 'react-native-indicators';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

class SectionListItem extends Component {
    render () {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactProfile', {userID: this.props.item.userID, favorited: this.props.item.favorited, userfname: this.props.item.fullname, changeFavoritedStatus: this.props.changeFavoritedStatus})}>
                <View style={styles.sectionListItemEncompCont}>
                    <View height={55} justifyContent="center">
                        <View flexDirection="row">
                            <View flex={1} flexDirection="row">
                                <LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.sectionlistItemUserBubble}>
                                    <Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(255,255,255)'}}>{this.props.item.initials}</Text>
                                </LinearGradient>
                                <View justifyContent="center">
                                <Text style={styles.sectionListItemUserName}>{this.props.item.fullname}</Text>                         
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

class SectionHeader extends Component {
    render() {

        if(this.props.section.title == "Favorited") {
            return (
                <View flex={1} marginLeft={30} marginTop={26}>
                    <Image source={require('../../../Images/starfilled.png')}/>
                </View>
            )
        }
        return (
            <View flex={1} marginLeft={38} marginTop={26}>
                <Text style={{fontFamily: 'SFProText-Medium', fontSize: 22, color: 'rgb(106,46,52)'}}>{this.props.section.title}</Text>
            </View>
        )
    }
}

const windowSize = Dimensions.get('window');
export default class contacts_screen extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
            contactList: [],
            starredContacts: [],
            myData: [],

        }
    }

    componentWillMount() {
        var fullContactsArr = [];
        usersList = firebase.database().ref('users/').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
        return firebase.database().ref('users/').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                //console.log("Another person in da list...")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log(childData.firstname + ' ' + childData.lastname)
                var contactObj = {'userID':childKey, 'fullname':childData.firstname + ' ' + childData.lastname, 'initials': childData.initials};
                //console.log("OBJECT: ", contactObj);
                fullContactsArr.push(contactObj);
                //testArray.push("foo")
            });

        }).then(() => {
            this.setState({myData: fullContactsArr})
        })
    }

    componentDidMount() {
        this.getCombinedContactList()
    }
	sortContactList(myArray) {
        function compare(a,b) {
          if (a.fullname < b.fullname)
            return -1;
          if (a.fullname > b.fullname)
            return 1;
          return 0;
        }

        return myArray.sort(compare);
    }

    checkIfFavorited(passedUID) {
        for (var i=0; i < this.state.starredContacts.length; i++) {
            if (this.state.starredContacts[i].userID === passedUID) {
                return true;
            }
        }
    }

    sliceFavoritedContacts(passedfavoritedContactsArr) {
        var favoritedContactsArr = passedfavoritedContactsArr;
            for(var i=0; i<favoritedContactsArr.length; i++) {
                for(var j=0; j<this.state.myData.length; j++) {
                    if(favoritedContactsArr[i].userID == this.state.myData[j].userID){
                        this.state.myData.splice(j,1);
                        break;
                    }
                }
            }        
            this.setState({starredContacts: favoritedContactsArr})
    }

    getCombinedContactList() {
        var favoritedContactsArr = [];
        var currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('favorite_users/' + currentUserId).once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log("Pushing yet another: " + childKey + ' ' + childData);
            favoritedContactsArr.push({userID: childKey, fullname: childData.fullname, initials: childData.initials, favorited: true});
            console.log("After NEW push, favoritedContactsArr is ", favoritedContactsArr)
          })
        }).then(() => {
            this.sliceFavoritedContacts(favoritedContactsArr)
        })
        .then(() => {
            favoritedContactsArr = this.sortContactList(favoritedContactsArr)
            console.log("AFTER REMOVE: ", this.state.myData)
            
            this.state.myData = this.sortContactList(this.state.myData)

            //********************************
            // FINAL CONTACT LIST IS SET HERE
            var sectionedList = this.createSectionedList(this.state.myData, favoritedContactsArr);
            this.setState({contactList: sectionedList});
            //********************************

            console.log("at the end of getCombinedContactList contactList is ", this.state.contactList)        
        })
    }

    createFavoritedSection(objectArray) {
        var usersBelongingToSection = [];
        for(var i=0; i<objectArray.length; i++) {
            usersBelongingToSection.push(objectArray[i]);
        }

        return usersBelongingToSection;
    }

    createSectionedList(setOfNormalContacts, setOfFavoritedContacts) {
        var sectionedList = [];
        var usersBelongingToSection = [];

        var favoritedSection = this.createFavoritedSection(setOfFavoritedContacts);
        if(favoritedSection.length > 0)
            sectionedList.push({title: 'Favorited', data: favoritedSection});

        var onLetter = 'A'
        for(var i=0; i<setOfNormalContacts.length; i++) {
            if(setOfNormalContacts[i].fullname[0] != onLetter) {
                //Push previous letter as whole section to sectionedList
                if(usersBelongingToSection.length > 0) {
                    sectionedList.push({title: onLetter, data: usersBelongingToSection});
                }
                onLetter = setOfNormalContacts[i].fullname.substring(0,1);
                usersBelongingToSection = [];
                usersBelongingToSection.push(setOfNormalContacts[i])
            } else { //Name starts with the same letter we are currently on
                usersBelongingToSection.push(setOfNormalContacts[i])
            }

            
        }
        if(usersBelongingToSection.length != 0)
            sectionedList.push({title: onLetter, data: usersBelongingToSection});

        for(var i=0; i<8; i++) {
          sectionedList.push({title: '', data: []});
        }
        //console.log("SECTIONED LIST: ",sectionedList);
        return(sectionedList);
    }

    changeFavoritedStatus(passedUID, removeOrAdd) {
        this.setState({contactList: []});

        if(removeOrAdd) {
            // HANDLES REMOVING FROM FAVORITED LIST
            var currentUserId = firebase.auth().currentUser.uid;
            // add uid (object) to contact list
            console.log("Adding the contact " + passedUID + " back to the full contact list.")
            
            // remove uid (object) from favorited list
            firebase.database().ref('favorite_users/' + currentUserId + '/' + passedUID).remove()
            .then(() => {   
                var fullContactsArr = this.state.myData;
                return firebase.database().ref('/users/' + passedUID).once('value')
                .then(function(snapshot) {
                    var userKey = snapshot.key;
                    var userData = snapshot.val();
                    var contactObj = {'userID':userKey, 'fullname':userData.firstname + ' ' + userData.lastname, 'initials':userData.initials};
                    fullContactsArr.push(contactObj);
                })
                .then(() => {
                    this.setState({myData: fullContactsArr})
                })
                .then(() => {
                    console.log(passedUID + " was removed from the favorites of user " + currentUserId + " on the server")
                // call get CombinedContactList()
                this.getCombinedContactList()  
                })
            })
        }
        else {
            // HANDLES ADDING TO FAVORITED LIST
            var currentUserId = firebase.auth().currentUser.uid;
            // add passeduid to favorited list
            console.log("Adding the contact " + passedUID + " back to the favorites list.")
            firebase.database().ref('/users/' + passedUID).once('value').then(function(snapshot) {
                var fullname = (snapshot.val().firstname + " " + snapshot.val().lastname);
                console.log("Fullname is initially " + fullname)
                firebase.database().ref('favorite_users/' + currentUserId + '/' + passedUID).set({'fullname': fullname, 'initials':snapshot.val().initials})
                // ...
            })
            .then(() => {
                this.getCombinedContactList()
            })
        }   

    }

    whatIsRendered() {
        if(this.state.contactList == []) {
            //console.log("THE HEIGHT OF THE HEADER IS: ",Header.HEIGHT);
            return (
                <View marginTop={50} alignItems="center">
                  <MaterialIndicator color='rgb(115,115,115)' size={35}/>
                </View>
            )
            
        }

        return (
            <View flex={1}>
                <SectionList
                    ListEmptyComponent={<View marginTop={50} alignItems="center">
                                            <MaterialIndicator color='rgb(115,115,115)' size={35}/>
                                        </View>}
                    renderItem={({item, index}) => {
                        return (<SectionListItem item={item} index={index} navigation={this.props.navigation} changeFavoritedStatus={this.changeFavoritedStatus.bind(this)}/>)
                    }}
                    renderSectionHeader={({section}) => {return(<SectionHeader section={section}/>)}}
                    sections={this.state.contactList}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }

	render() {
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
                <CustomTabButton tabName="Network"/>
                {this.whatIsRendered()}
                </ImageBackground>
            </View>
        )
	}
}

const styles = ({
    sectionListItemEncompCont: {
        flex: 1,
        paddingLeft: 80
    },
    // nameStyle: {
    //     fontFamily: 'HelveticaNeue-Medium',
    //     color: 'black',
    //     fontSize: 16
    // },
    sectionlistItemUserBubble: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,height: 2
        },          
        shadowRadius: 4,
        shadowOpacity: 1,
    },
    sectionListItemUserName: {
        fontFamily: 'SFProText-Light',
        fontSize: 15,
        color: 'rgb(115,115,115)'
    }	
})