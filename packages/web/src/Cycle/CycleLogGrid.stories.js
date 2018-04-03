import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles';

import CycleLogGrid from './CycleLogGrid.js';

import uuid from 'uuid';

storiesOf("Cycle/CycleLogGrid", module)
  .addDecorator((fn) => (
    <section className='section' style={{
      "max-width":"960px",
    }}>
      {fn()}
    </section>
  ))
  .add('blank', () => (
    <CycleLogGrid />
  )) 
  .add('with items', () => {
    let items = [];

    items = items.concat(Array(10).fill(true).map((e,i) => {
      return {
        type: 'cycle',
        press: 135 + Math.random()*10,
        squat: 315 + Math.random()*10
      };
    }));

    return <CycleLogGrid
      items={items}
    />
  }) 
