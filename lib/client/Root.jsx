import React from 'react';
import {render} from 'react-dom';

class Root extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

render(<Root/>, document.querySelector('#app'));
