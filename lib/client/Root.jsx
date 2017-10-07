import React from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar/index.jsx';
import Log from './Log/index.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
  }

  fetchDocs() {
    this.db.allDocs({
      include_docs: true
    }).then((data) => {
      
      this.setState({
        ...this.state,
        data: data.rows.map(row => {
          return row.doc;
        })
      });
    });
  }

  componentWillMount() {
    this.fetchDocs();
    this.db.changes({
      live: true,
      since: 'now',
    }).on('change', (data) => {
      this.fetchDocs();
    });
  }

  render () {
    if(!this.state || !this.state.data) {
      return null;
    }
    return (
      <div>
        <Log item={() => this.state.data[0] } onSubmit={(state) => {
            this.db.put(state)
        }}/>
        <pre id='testDebug'>{ JSON.stringify(this.state, null, 4) }</pre>
      </div>
    );
  }
}

Root.propTypes = {
  db: PropTypes.object.isRequired
};

module.exports = Root;
