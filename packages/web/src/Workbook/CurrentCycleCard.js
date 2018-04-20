import React from 'react';

import CycleDetail from '../CycleDetail';

export default class CurrentCycleCard extends React.Component {
  render() {
    const {
      cycle,
      logs,
      lift
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
            lift={lift}
            cycle={cycle}
            logs={logs}
          />
        </div>
        <footer className="card-footer">
          <a href={`#/cycle/${cycle._id}`} className="card-footer-item">More Info</a>
        </footer>
      </div>
    );
  }
}
