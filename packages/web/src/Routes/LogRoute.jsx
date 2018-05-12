import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

import Breadcrumb from './Breadcrumb.jsx';

export default class LogRoute extends EntityRoute {

  createNewEntity() {

    let entity = {
      isNew: true,
      date: new Date().toISOString().slice(0,10),
      type: 'log',
      weight: null,
      reps: null
    };

    try {
      const { search } = this.history.location;
      if(search) {
        const from = JSON.parse(decodeURIComponent(search.split('=')[1]));
        entity = { ...entity, ...from };
      }
    } catch(e) {
    }

    this.setState(entity);
  }

  render() {
    if(!this.state) {
      return <h1>LOADING</h1>;
    }
    return (
      <div id={`LogRoute-${this.props.id}`}>
        <Breadcrumb crumbs={[
            { title: 'Workbook', href: '/'},
            { title: 'Logs', href: '/logs' }
          ]}
          active={'New'}/>
        <Log 
          id={this.props.id} 
          item={this.state} 
          onSubmit={s => this.onSubmit(s)}
          onDelete={s => this.onDelete(s)}
        />
      </div>
    )
  }
};
