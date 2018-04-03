import React from 'react';

export default class CycleLogGrid extends React.Component {

  getCycleGroups() {
    const groups = this.props.items
      .filter(e => e.type === 'cycle')
      .map((e) => {
      return (
        <div className='card' style={{"margin-bottom":"20px"}}>
          <header class="card-header">
            <p class="card-header-title">
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </p>
          </header>
          <div class="card-content">
            <div class="content">
            </div>
          </div>
          <p>{e.press}</p>
        </div>
      );
    });
    return groups;
  }

  render() {
    const groups = this.getCycleGroups();
    return (
      <div>
        {groups}
      </div>
    );
  }
}

CycleLogGrid.defaultProps = {
  items: []
};
