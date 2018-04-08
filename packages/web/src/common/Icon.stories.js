import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles';

storiesOf("common/Icon", module)
  .addDecorator((fn) => (
    <section className='section' style={{
    }}>
      {fn()}
    </section>
  ))
  .add('blank', () => (
    <div>
      <p>lol</p>
      <i className="fas fa-user"></i>
      <i className="far fa-user"></i>
      <p>lol</p>
    </div>
  )) 

