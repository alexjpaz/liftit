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
  .add('with data', () => {
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
        _id: 123,
        type: 'log',
        lift: 'press',
        reps: 5,
        weight: 85
      },{
        type: 'log',
        lift: 'press',
        reps: 5,
        weight: 90
      },{
        type: 'log',
        lift: 'deadlift',
        reps: 5,
        weight: 400 * 0.9
      }]}
    />
  }) 
  .add('with custom props', () => {
    const items = [];

    items.push({ date: '2018-02-01' });

    return <CycleDetail
      lifts={["A","B","C","D"]}
      fractions={['10','20','30']}
      weeks={["foo","bar","baz"]}
      cycle={{
        type: 'cycle',
        date: '2018-01-01',
        press: 100,
        squat: 200,
        bench: 300,
        deadlift: 400
      }}
      logs={[{
        _id: 123,
        type: 'log',
        lift: 'press',
        reps: 5,
        weight: 85
      },{
        type: 'log',
        lift: 'press',
        reps: 5,
        weight: 90
      },{
        type: 'log',
        lift: 'deadlift',
        reps: 5,
        weight: 400 * 0.9
      }]}
    />
  }) 
