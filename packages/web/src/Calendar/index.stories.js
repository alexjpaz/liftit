import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Calendar from './';

storiesOf("Calendar", module)
  .add('default', () => (
    <Calendar />
  ))   
