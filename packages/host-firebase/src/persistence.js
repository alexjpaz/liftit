module.exports = () => {
  if(!window.liftit) {
    console.warn("liftit not found. changes will not be persisted");
    return;
  }

  const db = window.liftit.db;

  db.changes({
    since: 'now',
    include_docs: true,
    live: true,
  }).on('change', function (change) {
    var user = firebase.auth().currentUser;

    const id = change.id;

    if(user) {
      console.log(user);
      firebase.database().ref(`users/${user.uid}/events/${id}`).set(change.doc)
    }
  }).on('error', function (err) {
    console.error(err);
  });


  firebase.auth().onAuthStateChanged(function(user) {
    console.log(12312321313, user.uid)
    if (!user || !user.uid) return;

    console.log(user)

    firebase.database().ref(`users/${user.uid}/events`).on('value', (snapshot) => {
      console.log('snapshot', snapshot.val());
    });
  });
};
