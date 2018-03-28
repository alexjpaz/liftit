import React from 'react';

export default class Breadcrumb extends React.Component {
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
          <li className="is-active"><a aria-current="page">{this.props.active}</a></li>
        </ul>
      </nav>
    );
  }
}
