import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Calendar from './Calendar';

storiesOf("Calendar", module)
  .add('default', () => (
    <div style={{"padding":"10px 80px"}}>
      <Calendar />
    </div>
  ))   
