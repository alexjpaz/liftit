import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles';

import LogForm from './LogForm.jsx';

storiesOf("Log/LogForm", module)
  .addDecorator((fn) => (
    <div style={{
      "width":"960px",
      "padding": "10px 20px"
    }}>
      {fn()}
    </div>
  ))
  .add('blank', () => (
      <LogForm 
        id={123} 
        onSubmit={ action('on-submit') }
        onDelete={ action('on-delete') }
        postHandle= { action('post-handle') }
        />
  )) 
  .add('with props', () => (
      <LogForm 
        id={123} 
        item={{
          _id: 123,
          date: "2018-03-01",
          lift: 'deadlift',
          reps: 5,
          weight: 415
        }} 
        onSubmit={ action('on-submit') }
        onDelete={ action('on-delete') }
        postHandle= { action('post-handle') }
        />
  )) 
