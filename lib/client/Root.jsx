import React from 'react';

import TextControl from './TextControl.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.gun = props.gun;
      
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    this.root = this.props.gun.get('root');

    this.root.on((data) => {
      this.setState({
        ...this.state,
        items: data
      })
    });

    this.root.val((err, data) => {
      this.setState({
        ...this.state,
        data
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleOnChange(event) {
    event.preventDefault();

    var data = {};
    data[event.target.name] = event.target.value;
    this.root.put(data);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextControl name='foo' onChange={this.handleOnChange} />
        <hr />
        <pre>
          { 
            JSON.stringify(this.state, null, 2)
          }
        </pre>
      </form>
    );
  }
}

module.exports = Root;
