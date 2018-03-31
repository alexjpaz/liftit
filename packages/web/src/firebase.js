// Do some logic to determine 

let Firebase = window.firebase;

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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
 
  Firebase = mockapp;
} 

if(process.env.NODE_ENV === 'production' || process.env.REACT_APP_FIREBASE === 'production') {
  const firebase = require('firebase');

  var config = {
    apiKey: "AIzaSyDgxpIgtC9vqebEyg1sSouyu8RAKsEpXho",
    authDomain: "liftit-1138.firebaseapp.com",
    databaseURL: "https://liftit-1138.firebaseio.com",
    projectId: "liftit-1138",
    storageBucket: "liftit-1138.appspot.com",
    messagingSenderId: "592807124060"
  };

  Firebase = firebase.initializeApp(config);
}

export default Firebase;
