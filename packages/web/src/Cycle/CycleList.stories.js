import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles';

import CycleList from './CycleList.jsx';

import uuid from 'uuid';

storiesOf("Cycle/CycleList", module)
  .addDecorator((fn) => (
    <section className='section' style={{
      "max-width":"960px",
    }}>
      {fn()}
    </section>
  ))
  .add('blank', () => (
    <CycleList />
  )) 
  .add('with valid cycles', () => {
    let items = Array(10).fill(true).map((e,i) => {
      const date = new Date();
      date.setDate(i);
      return {
        _id: uuid().toString(),
        type: 'cycle',
        date: date.toISOString().slice(0,10),
        press: 100 + (i+1) * 5,
        deadlift: 200 + (i+1) * 10,
        bench: 100 + (i+1) * 5,
        squat: 200 + (i+1) * 10,
      }
    });

    return <CycleList
      items={items}
    />
  }) 
  .add('show trends', () => {
    let items = Array(3).fill(true).map((e,i) => {
      const date = new Date();
      date.setDate(i);
      return {
        _id: uuid().toString(),
        type: 'cycle',
        date: date.toISOString().slice(0,10),
        press: 100 + (i+1) * 5,
        deadlift: 100 - (i+1) * 10,
      }
    });

    return <CycleList
      items={items}
    />
  }) 
  .add('with limit 10', () => {
    let items = Array(100).fill(true).map((e,i) => {
      const date = new Date();
      date.setDate(i);
      return {
        _id: uuid().toString(),
        type: 'cycle',
        date: date.toISOString().slice(0,10),
        press: Math.round(Math.random() * 1000),
        deadlift: Math.round(Math.random() * 1000),
        bench: Math.round(Math.random() * 1000),
        squat: Math.round(Math.random() * 1000)
      }
    });

    return <CycleList
      limitTo={10}
      items={items}
    />
  }) 
