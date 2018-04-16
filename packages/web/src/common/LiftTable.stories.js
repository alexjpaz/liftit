import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import LiftTable from './LiftTable';

storiesOf("common/LiftTable", module)
  .add('default', () => (
    <div style={{"margin":"10px 80px","width":"425px"}}>
      <LiftTable
        lift="squat"
        week="3x5"
        weight="360"
      />
      <LiftTable
        lift="press"
        week="3x3"
        weight="145"
      />
      <LiftTable
        lift="bench"
        week="531"
        weight="145"
      />
      <LiftTable
        lift="deadlift"
        week="531"
        weight="145"
      />
    </div>
  ))   
