import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import SmartCard from './SmartCard';

storiesOf("Workbook/SmartCard", module)
  .add('default', () => (
    <div style={{"margin":"10px 80px","width":"425px"}}>
      <SmartCard />
    </div>
  ))   
