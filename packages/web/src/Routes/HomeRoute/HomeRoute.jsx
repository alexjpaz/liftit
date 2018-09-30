import React from 'react';
import EntityRoute from '../EntityRoute';

import NextLogCard from '../../Workbook/NextLogCard';
import Workbook from '../../Workbook/Workbook';
import GettingStartedCard from './GettingStartedCard';
import Calendar from '../../Calendar/Calendar';

export default class HomeRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return <h1>loading</h1>;
    }

    const props = {
      entries: this.state.list
    };

    return (
      <div className='section'>
        <GettingStartedCard {...props} />
        <Calendar />
        <br />
        { /* <NextLogCard /> */ }
        <Workbook 
          workbook={{
            entries: this.state.list
          }}
        />
      </div>
    )
  }
}

