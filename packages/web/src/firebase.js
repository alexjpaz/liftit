// Do some logic to determine 

let firebase = null;

if(process.env.REACT_APP_FIREBASE !== 'production') {
  console.info("firebase-mock enabled");
  var firebasemock = require('firebase-mock');

  var mockauth = new firebasemock.MockFirebase();
  var mockdatabase = new firebasemock.MockFirebase();
  mockdatabase.autoFlush();

  var mocksdk = firebasemock.MockFirebaseSdk(function(path) {
    return path ? mockdatabase.child(path) : mockdatabase;
  }, function() {
    return mockauth;
  });

  var mockapp = mocksdk.initializeApp();

  function loadDataFromLocalStorage() {
    try {
      if(!window.localStorage) return;

      const key = "liftit/firebase-mock/local";

      mockapp.database().ref().set(JSON.parse(localStorage.getItem(key)));

      mockapp.database().ref().on('value', (snap) => {
        localStorage.setItem(key, JSON.stringify(snap.val()));
      });
    } catch(e) {
      console.warn("Could not load data from localStorage", e);
    }
  }

  loadDataFromLocalStorage();

  mocksdk.auth().changeAuthState({
    uid: 'local',
    provider: 'custom',
    token: 'authToken',
    expires: Math.floor(new Date() / 1000) + 24 * 60 * 60,
    auth: {
      isAdmin: true
    }
  });
  mocksdk.auth().flush();
 
  firebase = mockapp;
} 

if(process.env.REACT_APP_FIREBASE === 'production') {
  console.info("firebase enabled");
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

  firebase = Firebase.initializeApp(config);

  // NOT SURE WHERE TO STICK THIS YET
  firebase.auth().onAuthStateChanged((user) => {
    if(!user) {
      firebase.auth().getRedirectResult().then(function(result) {
        console.log('getRedirectResult', result);
        if(!result.user) {
          var provider = new firebase.auth.GoogleAuthProvider();
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
}



export default firebase;
