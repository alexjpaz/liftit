import React from 'react';

import Calendar from './Calendar/index.jsx';
import Log from './Log/index.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.gun.get('root');
  }

  componentWillMount() {
    this.db.on((data) => {
      this.setState({
        ...this.state,
        data
      });
    });
  }

  bindOnChange(name) {
    return (data) => {
      this.state[name] = data;
      this.setState({
        ...this.state,
      });
      this.db.put(name, data);
    };
  }

  render () {
    return (
      <div>
        <Calendar />
        <Log onChange={this.bindOnChange('log')}/>
        <hr />
        <pre id='testDebug'>{ JSON.stringify(this.state) }</pre>
      </div>
    );
  }
}

module.exports = Root;
