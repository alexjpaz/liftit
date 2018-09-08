import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Calendar from './Calendar';

const sss = {
  padding: "10px 80px",
  margin: "0 auto",
  width: "490px"
};

storiesOf("Calendar", module)
  .add('default', () => (
    <div style={sss}>
      <Calendar />
    </div>
  ))   
