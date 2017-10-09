import React from 'react';

import EntityRoute from './EntityRoute';

import Log from '../Log/index.jsx';

class LogRoute extends EntityRoute {
  render() {
    if(!this.state) {
      return null;
    }

    let list = null
    if(this.state.list) {
      list = (
        <table className='table'>
          <tbody>
            {this.state.list.map((item) => {
              return (
                <tr key={item._id}>
                <td>
                  <a key={item._id} href={"#/logs/"+item._id}>
                    <span className="icon">
                      <i className="fa fa-home"></i>
                    </span>
                    {item.date}
                  </a>
                </td>
                  <td>{item.lift}</td>
                  <td>{item.weight}</td>
                  <td>{item.reps}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    return (
      <div>
        {list}
        <Log item={this.state} onSubmit={(state) => {
          this.db.put(state);
        }}/>
      </div>
    )

  }
};

module.exports = LogRoute;
