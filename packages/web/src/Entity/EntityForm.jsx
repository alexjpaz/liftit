import React from 'react';
import uuid from 'uuid';

import PropTypes from 'prop-types';


export default class EntityForm extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history || window.history;

    this.id = this.props.id || uuid().toString();
  }

  getType() {
    return "entity";
  }

  componentWillMount() {
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);

    const entity = {
      type: this.getType()
    };

    this.setState({
      ...entity,
      ...this.props.item
    });
  }

  handleOnChange(event) {
    event.preventDefault();

    var data = {};
    data[event.target.name] = event.target.value;

    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;

    this.setState(newState);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    if(this.props.onSubmit) {
      this.props.onSubmit(this.state);
      this.history.back();
    } else {
      console.warn("onSubmit handler not set");
    }
  }

  confirmDelete() {
    if(this.props.confirmDelete) {
      return this.props.confirmDelete();
    } else {
      return window.confirm("Are you sure you want to delete this entity?");
    }
  }

  handleOnDelete(event) {
    event.preventDefault();

    if(this.props.onDelete) {
      if(this.confirmDelete() === true) {
        this.props.onDelete(this.state);
        this.history.back();
      }
    } else {
      console.warn("onDelete handler not set");
    }
  }

  saveButtonComponent() {
    return (
      <button className='button is-primary the-save-button' onClick={this.handleOnSubmit}>Save</button>
    );
  }

  deleteButtonComponent() {
    return (
      <button className='button is-pulled-right the-delete-button' onClick={this.handleOnDelete}>Delete</button>
    );
  }

  control(Component, name) {
    return (<Component 
      name={name}
      onChange={this.handleOnChange}
      value={this.state[name] || ''}
    />)
  }

  render() {
    return null;
  }
}

EntityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  confirmDelete: PropTypes.func
};
