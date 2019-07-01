import React, { Component } from 'react';

// Externals
import { Provider } from 'react-redux';

import createStore from './store';
import Container from './container';

export default class PostOffices extends Component {

  constructor(props) {
    super(props);
    this.store = createStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <Container/>
      </Provider>
    );
  }
}
