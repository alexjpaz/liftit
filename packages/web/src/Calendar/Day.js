import React, { Component } from 'react';

export default class Day extends Component { 
  onSelect(e) {
    this.props.onSelect({ 
      date: this.props.date,
      event: e
    });
  }

  render() {
    let dayOfTheMonth = null; 

    if(this.props.date) {
      dayOfTheMonth = this.props.date.getDate();
    }

    let events = null;

    if(this.props.events) {
      events = this.props.events.map((e) => {
        return <div className='is-pulled-right' style={{
          "border": "1px solid",
          "color": e.color,
          "border-radius": "50%",
          "background": e.color,
          "width": "10px",
          "height": "10px"
        }}></div>
      });
    }


    return (
      <div className='Day cell' onClick={(e) => this.onSelect(e)}>
        <p className='has-text-left'>{dayOfTheMonth}</p>
        <div>
          {events}
        </div>
      </div>
    );
  }
}
