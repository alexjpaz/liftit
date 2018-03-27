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

  const key = "liftit/firebase-mock/local";

  mockapp.database().ref().set(JSON.parse(localStorage.getItem(key)));

  mockapp.database().ref().on('value', (snap) => {
    console.log('lol', snap.val());
    localStorage.setItem(key, JSON.stringify(snap.val()));
  });


  Firebase = mockapp;
}

export default Firebase;
