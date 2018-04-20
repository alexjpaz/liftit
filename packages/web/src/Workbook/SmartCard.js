import React from 'react';

import LiftTable from '../common/LiftTable'

import './SmartCard.css';

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
      <div className="SmartCard">
        <div className="card">
          <header class="card-header">
            <p class="card-header-title">
              Next Entry
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <p className="title has-text-centered">
                <span>{this.nextLift.lift} </span>
                <span>{this.nextLift.minimumReps}x{this.nextLift.weight}</span>
                <span> ({this.nextLift.targetReps})</span>
              </p>
              <LiftTable 
                week={this.nextLift.week} 
                weight={this.nextLift.weight}
              />
            </div>
          </div>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">Save</a>
            <a href="#" className="card-footer-item">Edit</a>
          </footer>
        </div>
      </div>
    );
  }
}
