import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#/">
            <img src="" alt="liftit v2" width="112" height="28"/>
          </a>

          <a className="navbar-item" href="#logs">
            Logs
          </a>

          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    );
  }

}

module.exports = Navbar;
