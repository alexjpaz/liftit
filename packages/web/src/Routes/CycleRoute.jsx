import React from 'react';

import EntityRoute from './EntityRoute';

import CycleForm from '../Cycle/CycleForm.jsx';

import Breadcrumb from './Breadcrumb.jsx';

export default class CycleRoute extends EntityRoute {

  createNewEntity() {
    this.setState({
      isNew: true,
      date: new Date().toISOString().slice(0,10),
      type: 'cycle',
      lifts: {}
    });
  }

  render() {
    if(!this.state) {
      return null;
    }
    return (
      <div id={`CycleForm-${this.props.id}`}>
        <Breadcrumb crumbs={[
            { title: 'Workbook', href: '/'},
            { title: 'Cycles', href: '/cycles' }
          ]}
          active={'New'}/>
        <CycleForm id={this.props.id} item={this.state} onSubmit={s => this.onSubmit(s)} onDelete={s => this.onDelete(s)}/>
      </div>
    )
  }
};
