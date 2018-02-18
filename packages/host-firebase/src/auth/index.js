document.addEventListener('DOMContentLoaded', function() {
  var config = {
    apiKey: "AIzaSyDgxpIgtC9vqebEyg1sSouyu8RAKsEpXho",
    authDomain: "liftit-1138.firebaseapp.com",
    databaseURL: "https://liftit-1138.firebaseio.com",
    projectId: "liftit-1138",
    storageBucket: "liftit-1138.appspot.com",
    messagingSenderId: "592807124060"
  };

  firebase.initializeApp(config);

  firebase.auth().getRedirectResult().then(function(result) {
    if(!result.user) {
      document.querySelector('#root').innerHTML = "Redirecting to sign-in page";
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    } else {
      var userId = result.user.uid;

      if(userId) {
        document.querySelector('#root').innerHTML = "Redirect to application";
        location.assign("/");
      }
    }
  });
});
