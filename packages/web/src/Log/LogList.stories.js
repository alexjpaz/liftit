import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles';

import { LogList } from './LogList.jsx';

import uuid from 'uuid';

storiesOf("Log/LogList", module)
  .addDecorator((fn) => (
    <div style={{
      "width":"960px",
      "padding": "10px 20px"
    }}>
      {fn()}
    </div>
  ))
  .add('blank', () => (
    <LogList />
  )) 
  .add('with valid logs', () => {
    let items = Array(10).fill(true).map((e,i) => {
      const date = new Date();
      date.setDate(i);
      const lifts = ['press','deadlift','bench','squat'];
      const lift = lifts[Math.floor(Math.random()*lifts.length)];
      return {
        _id: uuid().toString(),
        type: 'log',
        date: date.toISOString().slice(0,10),
        lift: lift,
        weight: Math.round(Math.random() * 1000),
        reps: Math.round(Math.random() * 10)
      }
    });

    return <LogList
      items={items}
    />
  }) 
