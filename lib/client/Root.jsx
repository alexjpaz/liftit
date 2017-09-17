import React from 'react';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.gun = props.gun;

      
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    this.root = gun.get('root');

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

        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" name='name' placeholder="Name" onChange={this.handleOnChange}>
          </div>
        </div>

        <div class="field">
          <label class="label">Role</label>
          <div class="control">
            <input class="input" type="text" name='role' placeholder="Name" onChange={this.handleOnChange}>
          </div>
        </div>
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
