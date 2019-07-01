import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import {
  NotFound,
  PostOffices,
  Shipments
} from './views';

export default class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route component={PostOffices} exact path="/"/>
        <Route component={PostOffices} exact path="/post-offices"/>
        <Route component={Shipments} exact path="/shipments"/>
        <Route component={NotFound} exact path="/not-found"/>
        <Redirect to="/not-found"/>
      </Switch>
    );
  }
}
