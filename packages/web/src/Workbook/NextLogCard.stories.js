import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import NextLogCard from './NextLogCard';

storiesOf("Workbook/NextLogCard", module)
  .addDecorator((fn) => (
    <div style={{"margin":"10px 80px","width":"425px"}}>
      {fn()}
    </div>
  ))
  .add('blank', () => (
    <NextLogCard />
  ))   
  .add('default', () => (
    <NextLogCard 
      nextLift={{  
        lift: 'press',
        minimumReps: 3,
        targetReps: 8,
        weight: 145,
        week: "3x3",
        cycle: {
          _id: "foo",
          press: 180
        }
      }}
    />
  ))   
