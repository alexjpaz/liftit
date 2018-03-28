import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Day from './Day';

const DayDecorator = (storyFn) => (
  <div style={{"width":"90px", "height":"90px", "margin":"20px"}} className='box'>
    { storyFn() }
  </div>
);

storiesOf("Calendar/Day", module)
  .addDecorator(DayDecorator)
  .add('default', () => (
      <Day />
  ))  
  .add('with date', () => (
    <Day
      date={new Date()} 
      onSelect={({ date }) => alert(`The date is ${date}`)}
    />
  ))  
  .add('with log', () => (
    <Day 
      date={new Date()} 
      events={[{
        color: "#faf"
      },{
        color: "#00f"
      }]}
    />
  ))  
