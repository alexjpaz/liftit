import React from 'react';

import { storiesOf } from '@storybook/react';

import '../styles';

import Navbar from './Navbar';

const NavbarDecorator = (storyFn) => (
  <div style={{"outline":"1px dashed red"}}>
    { storyFn() }
  </div>
);

storiesOf("layout/Navbar", module)
  .addDecorator(NavbarDecorator)
  .add('default', () => (
      <Navbar />
  ))  
