import React from 'react';
import EntityRoute from '../EntityRoute';

import Workbook from '../../Workbook/Workbook';

export default class HomeRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return <h1>loading</h1>;
    }

    return (
      <section className='section'>
        <Workbook 
          workbook={{
            entries: this.state.list
          }}
        />
      </section>
    )
  }
}

