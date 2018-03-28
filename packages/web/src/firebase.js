// Do some logic to determine 

let Firebase = window.firebase;

if(!Firebase) {
  console.log("Firebase was not found. Using `firebase-mock`");

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

export default Firebase;
