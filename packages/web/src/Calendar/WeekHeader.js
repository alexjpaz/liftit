import React, { Component } from 'react';


export default class WeekHeader extends Component { 
  render() {
    // NEEDS TO BE ANY ARRAY FOR GRID
    const days = ["S","M","T","W","T","F","S"];
    return days.map((day, i) => {
      return <div key={"k"+i} className="WeekHeader__Column cell">{day}</div>
    });
  }
}
