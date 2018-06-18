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

    const value = localStorage.getItem(key) || null;

    mockapp.database().ref().set(JSON.parse(value));

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

let firebase = mockapp;

module.exports = { 
  firebase,
  name: "MockFirebase"
};
