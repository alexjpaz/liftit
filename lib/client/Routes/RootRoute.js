import React from 'react';
import EntityRoute from './EntityRoute';

class RootRoute extends EntityRoute {
  render() {
    return <h1>Hello!</h1>;
  }
}

module.exports = RootRoute;
