import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import CycleDetail from './CycleDetail.js';

import { action } from '@storybook/addon-actions';

storiesOf("Cycle/CycleDetail", module)
  .addDecorator((fn) => (
    <section className='section' style={{
    }}>
      {fn()}
    </section>
  ))
  .add('blank', () => (
    <CycleDetail />
  )) 
  .add('with props', () => {
    const items = [];

    items.push({ date: '2018-02-01' });

    return <CycleDetail
      cycle={{
        type: 'cycle',
        date: '2018-01-01',
        press: 100,
        squat: 200,
        bench: 300,
        deadlift: 400
      }}
      logs={[{
        type: 'log',
        lift: 'press',
        weight: 85
      },{
        type: 'log',
        lift: 'press',
        weight: 90
      },{
        type: 'log',
        lift: 'deadlift',
        weight: 400 * 0.9
      }]}
    />
  }) 
