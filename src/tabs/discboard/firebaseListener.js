import firebase from 'firebase';

export const getReplies = (updaterFn) => {
	console.log("UPDATERFN: ",updaterFn)
	setListener('/discBoardreplies/-LGlVd-Rrxh-Zp7OqqAx/',updaterFn);
}

export const setListener = (endpoint,updaterFn) => {
   firebase.database().ref(endpoint).on('value', updaterFn);
}