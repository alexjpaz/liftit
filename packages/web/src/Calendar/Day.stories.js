import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Day from './Day';

storiesOf("Calendar/Day", module)
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
