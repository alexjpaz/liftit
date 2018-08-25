import React, { Component } from 'react';

export default class WeekHeader extends Component { 
  render() {
    return (
      <div className="WeekHeader">
        <div className="WeekHeader__Column">S</div>
        <div className="WeekHeader__Column">M</div>
        <div className="WeekHeader__Column">T</div>
        <div className="WeekHeader__Column">W</div>
        <div className="WeekHeader__Column">T</div>
        <div className="WeekHeader__Column">F</div>
        <div className="WeekHeader__Column">S</div>
      </div>
    );
  }
}
