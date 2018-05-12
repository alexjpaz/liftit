import React from 'react';

import LiftTable from '../common/LiftTable'

import './NextLogCard.css';

import { connect } from 'react-redux';

import { getNextLog } from './reducers/WorkbookReducers';

export class NextLogCard extends React.Component {
  render() {
    const nextLog = this.props.nextLog;

    if(!nextLog) {
      return <h1>next lift not defined</h1>;
    }

    return (
      <div className="NextLogCard">
        <div className="card">
          <header class="card-header">
            <p class="card-header-title">
              Next Entry
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <p className="title has-text-centered">
                <span>{nextLog.lift} </span>
                <span>{nextLog.minimumReps}x{nextLog.weight}</span>
                <span> ({nextLog.targetReps})</span>
              </p>
              <LiftTable 
                week={nextLog.week} 
                weight={nextLog.weight}
              />
            </div>
          </div>
          <footer className="card-footer">
            <a href={`#/logs/new?from=${JSON.stringify(this.props.nextLog)}`} className="card-footer-item">Save</a>
          </footer>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    nextLog: getNextLog(state.entries)
  };
};

export default connect(mapStateToProps)(NextLogCard);
