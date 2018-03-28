import React, { Component } from 'react';

export default class WeekHeader extends React.Component { 
  render() {
    return (
      <div className="columns has-text-centered is-gapless">
        <div className="column">S</div>
        <div className="column">M</div>
        <div className="column">T</div>
        <div className="column">W</div>
        <div className="column">T</div>
        <div className="column">F</div>
        <div className="column">S</div>
      </div>
    );
  }
}
