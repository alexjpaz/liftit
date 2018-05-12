import React from 'react';

import { connect } from 'react-redux';

import { 
  getCycleLogs,
  getLatestOfType
} from './reducers/WorkbookReducers';

import CycleDetail from '../CycleDetail';

export class CurrentCycleCard extends React.Component {
  render() {
    const {
      cycle,
      logs,
    } = this.props;


    return ( 
      <div className="card">
        <header class="card-header">
          <p class="card-header-title">
            Current Cycle
          </p>
        </header>
        <div className="card-content">
          <CycleDetail
            cycle={cycle}
            logs={logs}
          />
        </div>
        <footer className="card-footer">
          <a href={`#/cycles/${cycle._id}`} className="card-footer-item">More Info</a>
        </footer>
      </div>
    );
  }
}

export const mapStateToProps = ({ entries }) => {
  const cycle = getLatestOfType('cycle', entries);
  return {
    cycle,
    logs: getCycleLogs(cycle, entries)
  }
};

export default connect(mapStateToProps)(CurrentCycleCard);
