import React from 'react';

import LiftTable from '../common/LiftTable'

export default class SmartCard extends React.Component {
  constructor(props) {
    super(props);

    this.nextLift = {
      lift: 'press',
      minimumReps: 3,
      targetReps: 8,
      weight: 145,
      week: "3x3",
      cycle: {
        _id: "foo",
        press: 180
      }
    };

    this.state = {};
  }

  toggleContent(e) {
    this.setState({
      contentVisible: !this.state.contentVisible
    });
  }

  render() {
    const lift = this.props.lift;
    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p class="title">
              <span>{this.nextLift.lift} </span>
              <span>{this.nextLift.minimumReps}x{this.nextLift.weight}</span>
            </p>
            <LiftTable 
              week={this.nextLift.week} 
              weight={this.nextLift.weight}
            />
            <span>{this.nextLift.cycle[this.nextLift.lift]}</span>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">Save</a>
          <a href="#" className="card-footer-item">Edit</a>
        </footer>
      </div>
    );
  }
}
