import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles';

import CycleList from './CycleList.jsx';

import uuid from 'uuid';

storiesOf("Cycle/CycleList", module)
  .addDecorator((fn) => (
    <div style={{
      "width":"960px",
      "padding": "10px 20px"
    }}>
      {fn()}
    </div>
  ))
  .add('blank', () => (
    <CycleList />
  )) 
  .add('with valid cycles', () => {
    let items = Array(10).fill(true).map((e) => {
      return {
        _id: uuid().toString(),
        type: 'cycle',
        date: "2018-03-01",
        press: Math.round(Math.random() * 1000),
        deadlift: Math.round(Math.random() * 1000),
        bench: Math.round(Math.random() * 1000),
        squat: Math.round(Math.random() * 1000)
      }
    });

    return <CycleList
      items={items}
    />
  }) 
