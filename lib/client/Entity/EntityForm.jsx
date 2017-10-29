import React from 'react';
import uuid from 'uuid';

import PropTypes from 'prop-types';


class EntityForm extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.id || uuid().toString();
  }

  getType() {
    return "entity";
  }

  componentWillMount() {
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

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
      history.back();
    } else {
      console.warn("onSubmit handler not set");
    }
  }

  handleOnDelete(event) {
    event.preventDefault();

    if(this.props.onDelete) {
      const ans = window.prompt();
      if(ans) {
        this.props.onDelete(this.state);
        history.back();
      }
    } else {
      console.warn("onSubmit handler not set");
    }
  }

  render() {
    return null;
  }
}

EntityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

module.exports = EntityForm;
