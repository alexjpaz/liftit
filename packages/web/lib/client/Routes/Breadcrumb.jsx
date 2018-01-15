import React from 'react';

class Breadcrumb extends React.Component {
  getCrumbs() {
    return this.props.crumbs.map((item, index) => {
      return <li key={index}><a href={`#${item.href}`}>{item.title}</a></li>
    });
  }
  render() {
    return (
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {this.getCrumbs()}
          <li className="is-active"><a href="#" aria-current="page">{this.props.active}</a></li>
        </ul>
      </nav>
    );
  }
}

module.exports = Breadcrumb;
