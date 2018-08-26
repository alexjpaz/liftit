import React, { Component } from 'react';


export default class WeekHeader extends Component { 
  render() {
    // NEEDS TO BE ANY ARRAY FOR GRID
    return [
      <div className="WeekHeader__Column cell">S</div>,
      <div className="WeekHeader__Column cell">M</div>,
      <div className="WeekHeader__Column cell">T</div>,
      <div className="WeekHeader__Column cell">W</div>,
      <div className="WeekHeader__Column cell">T</div>,
      <div className="WeekHeader__Column cell">F</div>,
      <div className="WeekHeader__Column cell">S</div>,
    ];
  }
}
