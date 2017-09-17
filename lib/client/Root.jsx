import React from 'react';
import {render} from 'react-dom';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1,2,3]
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.items.push(event.target.item.value);
    this.setState(this.state);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='item' />
        <pre>
          { 
            this.state.items.map((item) => {
              return (<p>{item}</p>)
            })
          }
        </pre>
      </form>
    );
  }
}

render(<Root/>, document.querySelector('#app'));
