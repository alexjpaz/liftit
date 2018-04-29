import React from 'react';
import EntityRoute from '../EntityRoute';

import NextLogCard from '../../Workbook/NextLogCard';
import Workbook from '../../Workbook/Workbook';
import GettingStartedCard from './GettingStartedCard';

export default class HomeRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return <h1>loading</h1>;
    }

    const entries = this.state.list;
    const props = {
      entries: this.state.list
    };

    return (
      <div>
        <GettingStartedCard {...props} />
        <br />
        <NextLogCard />
        <br />
        <Workbook 
          workbook={{
            entries: this.state.list
          }}
        />
      </div>
    )
  }
}

