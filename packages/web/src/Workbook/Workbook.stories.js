import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Workbook from './Workbook';

storiesOf("Workbook", module)
  .add('default', () => (
    <div style={{"padding":"10px 80px"}}>
      <Workbook 
        workbook={{
          entries: [{
            type: 'log',
            date: '2018-01-01',
            lift: 'press',
            weight: 85,
            reps: 5
          },{
            date: '2018-01-01',
            type: 'cycle',
            press: 100,
            squat: 200,
            bench: 300,
            deadlift: 400
          }]
        }}
      />
    </div>
  ))   
