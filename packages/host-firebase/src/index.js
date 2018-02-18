const persistence = require('./persistence');

document.addEventListener('DOMContentLoaded', function() {

  try {
    var config = {
      apiKey: "AIzaSyDgxpIgtC9vqebEyg1sSouyu8RAKsEpXho",
      authDomain: "liftit-1138.firebaseapp.com",
      databaseURL: "https://liftit-1138.firebaseio.com",
      projectId: "liftit-1138",
      storageBucket: "liftit-1138.appspot.com",
      messagingSenderId: "592807124060"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
      console.log('lol', user);
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });

    var user = firebase.auth().currentUser;

    //if(!user) {
      //firebase.auth().getRedirectResult().then(function(result) {
        //console.log('getRedirectResult', result);
        //if(!result.user) {
          //var provider = new firebase.auth.GoogleAuthProvider();
          //firebase.auth().signInWithRedirect(provider);
        //} else {
          //var userId = result.user.uid;

          //firebase.database().ref(`users/${userId}/timestamp`).set({
            //date: `${new Date()}`
          //});

        //}
      //});
    //}

    persistence();
  } catch (e) {
    console.error(e);
  }

});
