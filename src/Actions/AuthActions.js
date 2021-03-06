import {EMAIL_CHANGED, PASSWORD_CHANGED, CONFIRM_CHANGED, FIRSTNAME_CHANGED, LASTNAME_CHANGED, INITIALS_CHANGED, HEADLINE_CHANGED, WEBSITE_CHANGED, LOCATION_CHANGED, BIO_CHANGED, IS_EMPTY,LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,LOGIN_USER, EXISTS_FAIL, NO_USER, NEW_USER, LOGOUT_USER_SUCCESS, LOGGEDIN_USER} from './types' 
import {Actions} from 'react-native-router-flux'
import {Alert} from 'react-native'
import firebase from 'firebase'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const confirmChanged = (text) => {
  return {
    type: CONFIRM_CHANGED,
    payload: text
  }
}

export const firstnameChanged = (text) => {
  console.log("firstnameChanged was called in AuthActions with text ", text)
  return {
    type: FIRSTNAME_CHANGED,
    payload: text
  }
}

export const lastnameChanged = (text) => {
  console.log("lastnameChanged was called in AuthActions with text ", text)
  return {
    type: LASTNAME_CHANGED,
    payload: text
  }
}

export const headlineChanged = (text) => {
  console.log("headlineChanged was called in AuthActions with text ", text)
  return {
    type: HEADLINE_CHANGED,
    payload: text
  }
}

export const websiteChanged = (text) => {
  console.log("websiteChanged was called in AuthActions with text ", text)
  return {
    type: WEBSITE_CHANGED,
    payload: text
  }
}

export const bioChanged = (text) => {
  console.log("bioChanged was called in AuthActions with text ", text)
  return {
    type: BIO_CHANGED,
    payload: text
  }
}

export const locationChanged = (text) => {
  console.log("locationChanged was called in AuthActions with text ", text)
  return {
    type: LOCATION_CHANGED,
    payload: text
  }
}

export const initialsChanged = (text) => {
  console.log("initialsChanged was called in AuthActions with text ", text)
  return {
    type: INITIALS_CHANGED,
    payload: text
  }
}

// function setuserStore (firstname, lastname, initials, headline, website, location, bio) {
//   console.log("setuserStore was called!")
//   return (dispatch) => {
//     console.log("Sending dispatches...")
//     dispatch({type: FIRSTNAME_CHANGED, payload: firstname})
//     dispatch({type: LASTNAME_CHANGED, payload: lastname})
//     dispatch({type: INITIALS_CHANGED, payload: initials})
//     dispatch({type: HEADLINE_CHANGED, payload: headline})
//     dispatch({type: WEBSITE_CHANGED, payload: website})
//     dispatch({type: LOCATION_CHANGED, payload: location})
//     dispatch({type: BIO_CHANGED, payload: bio})
//     console.log("All dispatches sent.")
//   }
// }

//Pass the second part a "newUser" prop to display "Account created!"
export const loginUser = ({email, password}) => {
  console.log("loginUser was run!!!")
  if (email == '', password == '') {
    return(dispatch) =>{
      isEmpty(email,password),
      alert ("Sign In By Entering an Email and Password!")
    }
  }
  else
  {
    console.log("Made it to the else!")
    return (dispatch) => {
      console.log("Sending dispatch to LOGIN_USER")
      dispatch({type: LOGIN_USER})
      console.log("Sent dispatch to LOGIN_USER")
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(user =>
        firebase.auth().onAuthStateChanged(function (user) {
          if(user) {
            console.log("The AuthState has Changed!")
            var userID = firebase.auth().currentUser.uid
            var firstname = ""
            var lastname = ""
            var initials = ""
            var headline = ""
            var website = ""
            var location = ""
            var bio = ""

            firebase.database().ref('/users/' + userID).once('value')
            .then(function(snapshot) {          
              firstname = snapshot.val().firstname
              lastname = snapshot.val().lastname
              email = snapshot.val().email
              initials = snapshot.val().initials
              headline = (snapshot.val().headline || "")
              website = (snapshot.val().website || "")
              location = (snapshot.val().location || "")
              bio = snapshot.val().bio
              console.log("website from firebase is ", website)
              console.log("bio from firebase is ", bio)    
            })
            .then(() => {
                dispatch({type: FIRSTNAME_CHANGED, payload: firstname})
                dispatch({type: LASTNAME_CHANGED, payload: lastname})
                dispatch({type: EMAIL_CHANGED, payload: email})
                dispatch({type: INITIALS_CHANGED, payload: initials})
                dispatch({type: HEADLINE_CHANGED, payload: headline})
                dispatch({type: WEBSITE_CHANGED, payload: website})
                dispatch({type: LOCATION_CHANGED, payload: location})
                dispatch({type: BIO_CHANGED, payload: bio})

                loginUserSuccess(dispatch, user)
            })
          
          } else {
            loginUserFail(dispatch)
          }
        })
     )
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      loginUserFail(dispatch);
      if (errorMessage == "The email address is badly formatted.") {
        Alert.alert(
          'Oops!',
          "That doesn't look like a valid email address – try again.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
      } else  if (errorMessage == "The password is invalid or the user does not have a password.") {
        Alert.alert(
          'Oops!',
          "That's not the password we have on file for that account – try again.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
      } else if (errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted.") {
        Alert.alert(
          'Oops!',
          "This account doesn't exist – try again, or tap 'First time user?' to create a new account.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
      } else {
        alert(errorMessage)
      }

    })

    //CHECK THAT PROMISE CONTAINS A CERTAIN VALUE      
    
    .catch(()=> loginUserFail(dispatch))
  }}
}

//Pass the second part a "newUser" prop to display "Account created!"
export const loginNewUser = ({email, password}) => {
  console.log("loginNewUser was run!!!")
  return (dispatch) => {
    console.log("Sending dispatch to LOGIN_USER")
    dispatch({type: LOGIN_USER})
    console.log("Sent dispatch to LOGIN_USER")
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(user =>
      firebase.auth().onAuthStateChanged(function (user) {
        if(user) {
          console.log("The AuthState has Changed!")
          var userID = firebase.auth().currentUser.uid
          var initials = ""
          var website = ""

          firebase.database().ref('/users/' + userID).once('value')
          .then(function(snapshot) {
            website = (snapshot.val().website || "")
            bio = snapshot.val().bio
            console.log("website from firebase is ", website)
            console.log("bio from firebase is ", bio)     
          })
          .then(() => {
            dispatch({type: INITIALS_CHANGED, payload: initials})
            dispatch({type: WEBSITE_CHANGED, payload: website})

            loginUserSuccess(dispatch, user)
          })
          
        } else {
          loginUserFail(dispatch)
        }
      })
    )
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      loginUserFail(dispatch);
      if (errorMessage == "The email address is badly formatted.") {
        Alert.alert(
          'Oops!',
          "That doesn't look like a valid email address – try again.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
      } else  if (errorMessage == "The password is invalid or the user does not have a password.") {
        Alert.alert(
          'Oops!',
          "That's not the password we have on file for that account – try again.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
      } else if (errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted.") {
        Alert.alert(
          'Oops!',
          "This account doesn't exist – try again, or tap 'First time user?' to create a new account.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
      } else {
        alert(errorMessage)
      }
    })
    //CHECK THAT PROMISE CONTAINS A CERTAIN VALUE      
    .catch(()=> loginUserFail(dispatch))
  }
}

//Add the new user to the 'users' database branch.
function writeNewUserData(userId, email,firstname,lastname) {
  var initials = parseInitials(firstname,lastname)
  console.log("Trying to 'writeNewUserData' to userId", userId)
  //Ensure that first and last name are capitalized.
  var firstnameCap = firstname[0].toUpperCase() + firstname.slice(1)
  var lastnameCap = lastname[0].toUpperCase() + lastname.slice(1)

  console.log("First and last name are " + firstnameCap + " " + lastnameCap)

  var headline = ""
  var website = ""
  var location = ""
  var bio = ""

  firebase.database().ref('users/' + userId).set({
    email: email,
    firstname: firstnameCap,
    lastname: lastnameCap,
    initials: initials,
    headline: headline,
    website: website,
    location: location,
    bio: bio,
  })
  initFavorite_Users(userId)
  console.log("Wrote with writeNewUserData!")
}

//Initialize favorites list, including the Fordham Foundry as a favorite for all new users.
//In addition to the plain userId stored, 
function initFavorite_Users(userId) {
  var firstname = "Fordham";
  var lastname = "Foundry";
  var firstlast = firstname + ' ' + lastname;
  firebase.database().ref('favorite_users/' + userId + '/yVXMElLOjGTqQDid8znTmvxNIyx1').set({'fullname':firstlast, 'initials':"FF"})
}

//Get first letter of first name and first letter of last name.
function parseInitials(firstname,lastname) {
  var name = firstname + " " + lastname;
  var initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return(initials)
}

export const newUser = ({email, password, confirm, firstname, lastname, headline, location, bio}) => {
  var testEmail = email.toLowerCase();
  var validFordham = testEmail.endsWith("@fordham.edu")
  console.log("In newUser, location is...", location)

  if (email == '', password == '', confirm == '', firstname == '', lastname == '') {
    return(dispatch) => {
      isEmpty(email,password,confirm,firstname,lastname),
      console.log("email is " + email + ", password is " + password + ", confirm is " + confirm + ", firstname is " + firstname + ", lastname is " + lastname)
      Alert.alert(
          'Oops!',
          "To sign up, all fields must be filled out.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )

    }
  } else if (validFordham == false) {
    return(dispatch) => {
      //alert("Oops! Your email must be a valid @fordham.edu address.")
      Alert.alert(
          'Oops!',
          "Your email must be a valid @fordham.edu address.",
          [
            {text: 'OK'},
          ],
          { cancelable: false }
      )
    }
  }
    else if (password.length < 8) {
    return(dispatch) => {
      //alert ("Oops! Password is too short – it should be at least 8 characters.")
      Alert.alert(
          'Oops!',
          "Password is too short – it should be at least 8 characters.",
          [
            {text: 'OK'},
          ],
      )
    }
  } else if (password != confirm){
    return(dispatch) => {
      console.log(password + " " + confirm)
      //alert("Oops! Password and Confirm Password did not match. Please try again.")
      Alert.alert(
          'Oops!',
          "Password and Confirm Password did not match. Please try again.",
          [
            {text: 'OK'},
          ],
      )
    }
  }
  else
  {
   return (dispatch) => {
    dispatch({type: NEW_USER})
    dispatch({type: FIRSTNAME_CHANGED, payload: firstname})
    dispatch({type: LASTNAME_CHANGED, payload: lastname})
    dispatch({type: EMAIL_CHANGED, payload: email})
    dispatch({type: HEADLINE_CHANGED, payload: headline})
    dispatch({type: LOCATION_CHANGED, payload: location})
    dispatch({type: BIO_CHANGED, payload: bio})
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Trying to fetch userId of current user')
        var userId = firebase.auth().currentUser.uid
        console.log("Current userID is ", userId)
        writeNewUserData(userId,email,firstname,lastname, headline, location, bio)
      })
      .then(() => {
        console.log("Running loginUser with props " + email + " " + password)  
        //const {email, password} = this.props;
        loginNewUser({ email, password})
      })
      .then(() => {
        var user = firebase.auth().currentUser;
        console.log("Trying to send email verification...")

        user.sendEmailVerification()
      })
      .then(function(){
        alert("Your Account Was Created! We have sent you a verification email to your email address. Please make sure you received it.")
        console.log("Email verification was sent!!")
      })
      .catch(function(error) {
        //alert(error)
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert("Oops! Try a stronger password.");
        } else if (errorCode == 'auth/email-already-in-use') {
          Alert.alert(
          'Oops!',
          "An account based on that email address already exists. Try again or tap 'I already have an account.'",
          [
            {text: 'OK'},
          ],
      )
        } else if (errorCode == 'auth/invalid-email') {
          alert("Oops! That doesn't appear to be a valid email address.")
        } else if (errorCode == 'auth/operation-not-allowed') {
          alert("Oops! There's a problem with the server. Please contact us at fordhamfoundryapp@gmail.com and let us know.")
        }
        console.log(error);
      })
      .then (() => {
          //alert ('Your Account Was Created!');
        this.props({
          email,
          password,
          firstname,
          lastname,
          loading
        })
      })
      .catch(() => existsFail(dispatch))
      // .catch(function(error) {
      //   //Handling Errors...
      //   var errorCode = error.code;
      //   var errorMessage = error.message;

      //   if (errorCode == 'auth/weak-password') {
      //     alert("Oops! Try a stronger password.");
      //   } else if (errorCode == 'auth/email-already-in-use') {
      //     alert("Oops! There already exists an account with the given email address.")
      //   } else if (errorCode == 'auth/invalid-email') {
      //     alert("Oops! That doesn't appear to be a valid email address.")
      //   } else if (errorCode == 'auth/operation-not-allowed') {
      //     alert("Oops! There's a problem with the server. Please contact us at fordhamfoundryapp@gmail.com and let us know.")
      //   }
      //   console.log(error);
      // })
    }
  }
}


export const isEmpty = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: IS_EMPTY})
    
  }
}

export const noUser = (dispatch) => {
  dispatch ({
    type: NO_USER
  })
}

export const existsFail = (dispatch) => {
  dispatch({
    type: EXISTS_FAIL
  })
}

export const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  })
}

export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
}

export const logoutUser = () => {
  firebase.auth().signOut()
  return {
    type: LOGOUT_USER_SUCCESS
  }
}

export const loggedInUser = (user) => {
    return (dispatch) => {
      console.log("Sending dispatch to LOGIN_USER")
      dispatch({type: LOGIN_USER})
      console.log("Sent dispatch to LOGIN_USER")
      console.log("The AuthState has Changed!")
      var userID = firebase.auth().currentUser.uid
      var firstname = ""
      var lastname = ""
      var initials = ""
      var headline = ""
      var website = ""
      var location = ""
      var bio = ""

      firebase.database().ref('/users/' + userID).once('value')
      .then(function(snapshot) {
        firstname = snapshot.val().firstname
        lastname = snapshot.val().lastname
        email = snapshot.val().email
        initials = snapshot.val().initials
        headline = (snapshot.val().headline || "")
        website = (snapshot.val().website || "")
        location = (snapshot.val().location || "")
        bio = snapshot.val().bio      
      })
      .then(() => {
          dispatch({type: FIRSTNAME_CHANGED, payload: firstname})
          dispatch({type: LASTNAME_CHANGED, payload: lastname})
          dispatch({type: EMAIL_CHANGED, payload: email})
          dispatch({type: INITIALS_CHANGED, payload: initials})
          dispatch({type: HEADLINE_CHANGED, payload: headline})
          dispatch({type: WEBSITE_CHANGED, payload: website})
          dispatch({type: LOCATION_CHANGED, payload: location})
          dispatch({type: BIO_CHANGED, payload: bio})

          loginUserSuccess(dispatch, user)
      })
    }
}