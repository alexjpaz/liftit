import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import CycleForm from './CycleForm.jsx';

import { action } from '@storybook/addon-actions';

storiesOf("Cycle/CycleForm", module)
  .addDecorator((fn) => (
    <div style={{
      "width":"960px",
      "padding": "10px 20px"
    }}>
      {fn()}
    </div>
  ))
  .add('blank', () => (
      <CycleForm 
        id={123} 
        onSubmit={ action('on-submit') }
        onDelete={ action('on-delete') }
        postHandle= { action('post-handle') }
        />
  )) 
  .add('with props', () => (
      <CycleForm 
        id={123} 
        item={{
          _id: 123,
          date: "2018-03-01",
          press: 100,
          deadlift: 200,
          bench: 300,
          squat: 400
        }} 
        onSubmit={ action('on-submit') }
        onDelete={ action('on-delete') }
        postHandle= { action('post-handle') }
        />
  )) 
