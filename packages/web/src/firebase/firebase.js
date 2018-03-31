const Firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


var config = {
  apiKey: "AIzaSyDgxpIgtC9vqebEyg1sSouyu8RAKsEpXho",
  authDomain: "liftit-1138.firebaseapp.com",
  databaseURL: "https://liftit-1138.firebaseio.com",
  projectId: "liftit-1138",
  storageBucket: "liftit-1138.appspot.com",
  messagingSenderId: "592807124060"
};

let firebase = Firebase.initializeApp(config);

// HACK
const provider = new Firebase.auth.GoogleAuthProvider();

// NOT SURE WHERE TO STICK THIS YET
firebase.auth().onAuthStateChanged((user) => {
  if(!user) {
    firebase.auth().getRedirectResult().then(function(result) {
      console.log('getRedirectResult', result);
      if(!result.user) {
        firebase.auth().signInWithRedirect(provider);
      } else {
        var userId = result.user.uid;

        firebase.database().ref(`users/${userId}/timestamp`).set({
          date: `${new Date()}`
        });

      }
    });
  }
});

module.exports = { 
  firebase,
  name: "firebase"
};
