import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, date } from '@storybook/addon-knobs';

import '../styles';

import Calendar from './Calendar';

const SmallCenterDecorator = (storyFn) => {
  const sss = {
    padding: "10px 80px",
    margin: "0 auto",
    width: "490px"
  };
  return (
    <div style={sss}>
      {storyFn()}
    </div>
  );
};

storiesOf("Calendar", module)
  .addDecorator(SmallCenterDecorator)
  .add('default', () => (
      <Calendar onSelectDay={action("day selected")}/>
  ))
  .add('with date', () => (
    <Calendar onSelectDay={action("day selected")} date={new Date("2018-02-05")}/>
  ))



storiesOf("Calendar", module)
  .addDecorator(SmallCenterDecorator)
  .addDecorator(withKnobs)
  .add('with knobs', () => {
    const dateKnob = date('Date', new Date("2018-07-22"), "FOO");
    const dateObject = new Date(dateKnob);

    return (
      <Calendar onSelectDay={action("day selected")} date={dateObject}/>
    );
  })
