import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import NextLogCard from './NextLogCard';

storiesOf("Workbook/NextLogCard", module)
  .add('default', () => (
    <div style={{"margin":"10px 80px","width":"425px"}}>
      <NextLogCard />
    </div>
  ))   
