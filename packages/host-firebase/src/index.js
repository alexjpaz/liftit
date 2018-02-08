const bootstrap = require('./bootstrap');

document.addEventListener('DOMContentLoaded', function() {

  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    console.log("Loaded firebase with features", features);
    bootstrap(app);
  } catch (e) {
    console.error(e);
  }

});
