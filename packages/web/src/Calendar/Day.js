import React, { Component } from 'react';

export default class Day extends Component { 
  constructor(props) {
    super(props);

    let dayOfTheMonth = null; 

    if(this.props.date) {
      dayOfTheMonth = this.props.date.toISOString().slice(8, 10);
      dayOfTheMonth = +dayOfTheMonth;
    }

    this.dayOfTheMonth = dayOfTheMonth;
  }

  onSelect(e) {
    this.props.onSelect({ 
      date: this.props.date,
      event: e
    });
  }

  render() {
    let events = null;

    if(this.props.events) {
      events = this.props.events.map((e) => {
        return <div className='is-pulled-right' style={{
          "margin-top": "4px",
          "border": "1px solid",
          "color": e.color,
          "border-radius": "50%",
          "background": e.color,
          "width": "6px",
          "height": "6px"
        }}></div>
      });
    }


    return (
      <div className='Day cell' onClick={(e) => this.onSelect(e)}>
        <div>
          {events}
        </div>
        <p className='has-text-left'>{this.dayOfTheMonth}</p>
      </div>
    );
  }
}
