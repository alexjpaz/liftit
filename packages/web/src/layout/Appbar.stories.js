import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Appbar from './Appbar';

const AppbarDecorator = (storyFn) => (
  <div style={{"outline":"1px dashed red"}}>
    { storyFn() }
  </div>
);

storiesOf("layout/Appbar", module)
  .addDecorator(AppbarDecorator)
  .add('default', () => (
      <Appbar />
  ))  
