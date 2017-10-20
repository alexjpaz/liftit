import React from 'react';

class Burger extends React.Component {
  constructor(props) {
    super(props);

    this.toggleBurger = this.toggleBurger.bind(this);
  }

  getClassNames() {
    let names = [
      "burger",
      "navbar-burger"
    ];

    if(this.props.isActive) {
      names.push("is-active");
    }

    return names.join(" ");
  }

  toggleBurger() {
    this.props.toggleBurger();
  }

  render() {
    return (
      <div className={this.getClassNames()} onClick={this.toggleBurger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}

class Icon extends React.Component {
  render() {
    return <span className="icon">
      <i className={`fa fa-${this.props.name}`}></i>
    </span>
  }
}

class Navbar extends React.Component {
  componentWillMount() {
    this.setState({
      burger: {
        isActive: false
      }
    });

    this.toggleBurger = this.toggleBurger.bind(this);
  }

  toggleBurger(e) {
    this.setState({
      ...this.state,
      burger: {
        isActive: !this.state.burger.isActive
      }
    });
  }
  render() {
    return (
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#/">
            <img src="" alt="liftit v2" width="112" height="28"/>
          </a>
          <a className="navbar-item is-hidden-desktop-only" href="#/logs/new">
            <Icon name='plus-circle' />
          </a>
          <a className="navbar-item is-hidden-desktop-only" href="#/logs">
            <Icon name='calendar-o' />
          </a>
          <Burger 
            isActive={this.state.burger.isActive} 
            toggleBurger={this.toggleBurger}
          />
        </div>

        <div className={['navbar-menu', this.state.burger.isActive ? 'is-active' : ''].join(' ')}>
          <div className="navbar-start">
            <a className="navbar-item" href="#/logs">
              Logs
            </a>
            <a className="navbar-item" href="#/cycles">
              Cycles
            </a>
          </div>

          <div className="navbar-end">
            <a className="navbar-item" href="#/settings">
              Settings
            </a>
          </div>
        </div>



      </nav>
    );
  }

}

module.exports = Navbar;
