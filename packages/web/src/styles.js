import 'bulma/css/bulma.css'
import './index.css';

(function() {
  if(document) {
    const script = document.createElement('script');

    script.src = 'https://use.fontawesome.com/releases/v5.0.9/js/all.js';

    const root = document.head || document.body;

    root.appendChild(script);
  }
})();
