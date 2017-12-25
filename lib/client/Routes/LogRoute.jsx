import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

import Breadcrumb from './Breadcrumb.jsx';

class LogRoute extends EntityRoute {

  createNewEntity() {
    this.setState({
      isNew: true,
      date: new Date().toISOString().slice(0,10),
      type: 'log',
      weight: 100
    });
  }

  onSubmit(state) {
    if(this.state.isNew) {
      delete this.state.isNew;
      const d = this.db.post(this.state);
    } else {
      this.db.put(state);
    }
  }

  render() {
    if(!this.state) {
      return null;
    }
    return (
      <div id={`LogRoute-${this.props.id}`}>
        <Breadcrumb crumbs={[
            { title: 'Workbook', href: '/'},
            { title: 'Logs', href: '/logs' }
          ]}
          active={'New'}/>
        <Log id={this.props.id} item={this.state} onSubmit={s => this.onSubmit(s)}/>
      </div>
    )
  }
};

module.exports = LogRoute;
