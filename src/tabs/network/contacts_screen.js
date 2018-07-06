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
                                    <Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.item.initials}</Text>
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
                    <MatIcon name="star" size={29} color="rgb(106,46,52)"/>
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
        //console.log("Trying to generate the contact list from the database...")
        //this.usersRef = firebase.database().ref('users').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
        // Make sure we remove all previous listeners.
        //this.usersRef.off();
        //usersRef.on('value', function(snapshot) {
          //snapshot.forEach(function(childSnapshot) {
            //console.log("Another first name...")
            //var childData = childSnapshot.val();
            //console.log(childData.firstname + ' ' + childData.lastname)
          //});
        //});        
    }

    // getOnlyContent() {

    // 	var onlyContentArr = []
    // 	// console.log(myData['A'].length)
    // 	// console.log(myData['A'][0].User.length)
    // 	// console.log(myData['A'][0].User[0].content)
    // 	for (var i = 0; i < myData['A'][0].User.length; i++) {
    // 		onlyContentArr.push(myData['A'][0].User[i].content);
    // 	}

    // 	return onlyContentArr;
    // }

	sortContactList(myArray) {
		//var onlyContentArr = this.getOnlyContent();
        function compare(a,b) {
          if (a.fullname < b.fullname)
            return -1;
          if (a.fullname > b.fullname)
            return 1;
          return 0;
        }

        return myArray.sort(compare);
    }

    //Searches for specified userID
    // searchForUserID(nameKey, myArray) {
    //     for (var i=0; i < myArray.length; i++) {
    //         if (myArray[i].userID === nameKey) {
    //             return i;
    //         }
    //     }
    // }

    checkIfFavorited(passedUID) {
        for (var i=0; i < this.state.starredContacts.length; i++) {
            if (this.state.starredContacts[i].userID === passedUID) {
                return true;
            }
        }
    }

    sliceFavoritedContacts(passedfavoritedContactsArr) {

        //var removeKeysArr = [];
        var favoritedContactsArr = passedfavoritedContactsArr;
        // for(var i=0; i<this.state.starredContacts.length; i++) {
        //    //var indexOfUser =  this.searchForUserID(this.state.starredContacts[i].userID, this.state.myData);
        //    //var contactUID = this.state.myData[indexOfUser].userID;
        //    //var contactFName = this.state.myData[indexOfUser].fullname;

        //    //var contactObj = {'userID':contactUID, 'fullname':contactFName};
        //    //console.log("OBJECT: ", contactObj);
        //    //favoritedContactsArr.push(contactObj);
        //    //this.setState({myData: this.state.myData.splice(indexOfUser,1)})
        // }
        // console.log("Once again, MyData is ", this.state.myData)
        // console.log("Trying to get the favorites for this user...")

        // var currentUserId = firebase.auth().currentUser.uid;
        // //usersFavs = firebase.database().ref('favorite_users/' + currentUserId).orderByValue();//.startAt('Cha').endAt('Cha\uf8ff');
        // return firebase.database().ref('favorite_users/' + currentUserId).once('value').then(function(snapshot) {
        // //console.log("Pulled a reference to userFavs.")
        // //console.log("usersFavs is ", usersFavs)
        // // Make sure we remove all previous listeners..?
        // //usersFavs.off();

        // //usersFavs.on('value', function(snapshot) {

        //     //console.log("Testing...")
        //   snapshot.forEach(function(childSnapshot) {
        //     //console.log("Another name...")
        //     var childKey = childSnapshot.key;
        //     var childData = childSnapshot.val();
        //     //console.log(childKey)
        //     //console.log(childData)
        //     //var favObj = {'userID':childKey, 'fullname':childData};
        //     //console.log("Pushing OBJECT: " + childKey + ' ' + childData);
        //     favoritedContactsArr.push({userID: childKey, fullname: childData});
        //     console.log("After push, favoritedContactsArr is ", favoritedContactsArr)
        //     //alert("Within forEach " + favoritedContactsArr.length);
        //     //removeKeysArr.push(favObj.userID);
        //     //console.log("Within forEach, My Data is ", this.state.myData)
        //     //this.setState({myData: this.state.myData.splice(childKey,1)})        //Removes the contact from the full contact list since it's a favorite.
        //   });
        // //console.log("Can we get myData here? ", this.state.myData)
        
        // }).then(() => {
        // //setTimeout(() => {     
        //     //console.log("Favorites to remove are ", favoritedContactsArr)
        //     //console.log("removeKeysArr is ", removeKeysArr)
        //     //console.log("First element of favoritedContactsArr is ", favoritedContactsArr[0])
        //     //alert("Within sliceFavoritedContacts, it has length " + favoritedContactsArr.length);
        //     //console.log("favoritedContactsArr.length is ", Object.keys(favoritedContactsArr).length)
            for(var i=0; i<favoritedContactsArr.length; i++) {
                //console.log("Iteration number ", i)
                //console.log("Here myData is ", this.state.myData)
                //console.log("And the userID to be removed is ", favoritedContactsArr[i].userID)
                for(var j=0; j<this.state.myData.length; j++) {
                    //console.log("Checking fav " + favoritedContactsArr[i].userID + " against user " + this.state.myData[j].userID)
                    //console.log("j Iteration is ", j)
                    if(favoritedContactsArr[i].userID == this.state.myData[j].userID){
                        this.state.myData.splice(j,1);
                        //console.log("Removing this one!")
                        break;
                    }
                }
                //this.setState({myData: this.state.myData.splice(favoritedContactsArr[i].userID,1)})
            }
        //},2000)
            // console.log("AFTER INITIAL REMOVE: ", this.state.myData)
        
            this.setState({starredContacts: favoritedContactsArr})
            //return favoritedContactsArr;
        //})
    }

    getCombinedContactList() {
        //console.log("My Data is ", this.state.myData)
        //var favoritedContactsArr = this.sliceFavoritedContacts()
        var favoritedContactsArr = [];
        var currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('favorite_users/' + currentUserId).once('value')
        .then(function(snapshot) {
        // usersFavs = firebase.database().ref('favorite_users/' + currentUserId).orderByValue();
        // usersFavs.on('value', function(snapshot) {

            //console.log("Testing...")
          snapshot.forEach(function(childSnapshot) {
            //console.log("Another name...")
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            //console.log(childKey)
            //console.log(childData)
            //var favObj = {'userID':childKey, 'fullname':childData};
            console.log("Pushing yet another: " + childKey + ' ' + childData);
            favoritedContactsArr.push({userID: childKey, fullname: childData.fullname, initials: childData.initials, favorited: true});
            console.log("After NEW push, favoritedContactsArr is ", favoritedContactsArr)
            //alert("Within forEach " + favoritedContactsArr.length);
            //removeKeysArr.push(favObj.userID);
            //console.log("Within forEach, My Data is ", this.state.myData)
            //this.setState({myData: this.state.myData.splice(childKey,1)})        //Removes the contact from the full contact list since it's a favorite.
          })
        }).then(() => {
            this.sliceFavoritedContacts(favoritedContactsArr)
        })
        .then(() => {
            //console.log("Favs array is ", favoritedContactsArr)
            favoritedContactsArr = this.sortContactList(favoritedContactsArr)
            //console.log("FAVORITED CONTAXTS ARRAY OUTPUT",favoritedContactsArr);
            //console.log("And sorted, it is...")
            //  NEED THIS LATER favoritedContactsArr = this.sortContactList(favoritedContactsArr);
            // this.setState({lengthOfFavorites: favoritedContactsArr.length})
            
            // //console.log("BEFORE REMOVE: ", myData)
            // for(var i=0; i<favoritedContactsArr.length; i++) {
            //     //console.log("FAVORITED UID: ", favoritedContactsArr[i].userID)
            //     var indexToDelete = this.searchForUserID(favoritedContactsArr[i].userID,myData);
            //     myData.splice(indexToDelete,1);
            // }
            //setTimeout(() => {
            console.log("AFTER REMOVE: ", this.state.myData)
            
            this.state.myData = this.sortContactList(this.state.myData)
            //var joinedData = favoritedContactsArr.concat(this.state.myData);



            //********************************
            // FINAL CONTACT LIST IS SET HERE
            var sectionedList = this.createSectionedList(this.state.myData, favoritedContactsArr);
            this.setState({contactList: sectionedList});
            //********************************



            //joinedData = this.sortContactList(joinedData);
            //console.log("at the end of getCombinedContactList joinedData is ", joinedData)
            console.log("at the end of getCombinedContactList contactList is ", this.state.contactList)        
            // console.log("STATE IS AFTER: ", this.state.contactList);
            //return joinedData
            //},4000)
        })

        // console.log("BEFORE SET STATE: ", joinedData)
        // console.log("STATE IS BEFORE: ", this.state.contactList);



    }

    createFavoritedSection(objectArray) {
        var usersBelongingToSection = [];
        //var onLetter = 'Favorited'
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

        // if(setOfNormalContacts.length > 0) {
        var onLetter = 'A'
        for(var i=0; i<setOfNormalContacts.length; i++) {
            // console.log('FULL NAME IS: ',objectArray[i].fullname)
            // console.log("STARTING LETTER OF FULL NAME IS: ",objectArray[i].fullname.substring(0,1))
            //Name starts with next letter in the alphabet
            if(setOfNormalContacts[i].fullname[0] != onLetter) {
                //Push previous letter as whole section to sectionedList
                //var sectionObject = {title: onLetter, usersBelongingToSection};
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
        console.log("SECTIONED LIST: ",sectionedList);
        return(sectionedList);
    }

    changeFavoritedStatus(passedUID, removeOrAdd) {
        //console.log('SOMEONE NEW HAS BEEN FAVORITED')
        this.setState({contactList: []});
        //console.log("passed uid: ", passedUID);
        //console.log("passed value: ", removeOrAdd);

        if(removeOrAdd) {
            // HANDLES REMOVING FROM FAVORITED LIST
            var currentUserId = firebase.auth().currentUser.uid;
            // add uid (object) to contact list
            console.log("Adding the contact " + passedUID + " back to the full contact list.")
            
            // remove uid (object) from favorited list
            firebase.database().ref('favorite_users/' + currentUserId + '/' + passedUID).remove()
            .then(() => {   
                var fullContactsArr = this.state.myData;
                //usersList = firebase.database().ref('users/').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
                return firebase.database().ref('/users/' + passedUID).once('value')
                .then(function(snapshot) {
                    //console.log("Another person in da list...")
                    var userKey = snapshot.key;
                    var userData = snapshot.val();
                    var contactObj = {'userID':userKey, 'fullname':userData.firstname + ' ' + userData.lastname, 'initials':userData.initials};
                    //console.log("OBJECT: ", contactObj);
                    fullContactsArr.push(contactObj);
                    //testArray.push("foo")
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
            // .then(() => {
            //     console.log("Fullname is now" + fullName)
                
              
            // })
            // call getCombinedContactList();
            .then(() => {
                this.getCombinedContactList()
            })
            //var fullName = firebase.database().ref('users/' + passedUID + '/firstname/') + " " + firebase.database().ref('users/' + passedUID + '/lastname/')
            //var lastName = firebase.database().ref('/users/' + passedUID + '/lastname/')
            // search for index of passed uid in contactlist
            
        }   

    }

    // renderListItem(item) {
    //     var isFavorited = this.checkIfFavorited(item.userID)
    //     if(isFavorited) {
    //         return (
    //             <View flex={1} marginTop={25}>
    //             <StarredContactListItem favorited={true} destination="ContactProfile" navigation={this.props.navigation} changeFavoritedStatus={this.changeFavoritedStatus.bind(this)} userID={item.userID} userfname={item.fullname} usercontent={item.content}/>
    //             </View>
    //         )

    //     } else {
    //         return (
    //             <View flex={1} marginTop={15}>
    //             <StarredContactListItem favorited={false} destination="ContactProfile" navigation={this.props.navigation} changeFavoritedStatus={this.changeFavoritedStatus.bind(this)} userID={item.userID} userfname={item.fullname} usercontent={item.content}/>
    //             </View>
    //        )
    //     }
    // }

    whatIsRendered() {
        if(this.state.contactList == []) {
            //console.log("THE HEIGHT OF THE HEADER IS: ",Header.HEIGHT);
            return (
                <View marginTop={50} alignItems="center">
                  <MaterialIndicator color='rgb(115,115,115)' size={35}/>
                </View>
            )
            
            // console.log("EMPTY: ",this.state.contactList)
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
        //setTimeout(() => {
        //console.log("COMBINED: ",joinedData)
        //console.log("STATE IS AFTER: ", this.state.contactList);
        //},10000)
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
        //alignItems: 'center'
        // borderWidth: 1,
        // borderColor: 'black'
    },
    nameStyle: {
        fontFamily: 'HelveticaNeue-Medium',
        color: 'black',
        fontSize: 16
    },
    sectionlistItemUserBubble: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionListItemUserName: {
        fontFamily: 'SFProText-Light',
        fontSize: 15,
        color: 'rgb(115,115,115)'
    }	
})