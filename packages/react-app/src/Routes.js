import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Account, AllChievs, Home, SnapShot, Submissions }from "./views"
const Routes = () => {
    return (
      <>
        <Switch>
        <Route path="/submissions" component={Submissions} />
        <Route path="/snapshot" component={SnapShot} />
        <Route path="/account" component={Account} />
        <Route path="/chievs" component={AllChievs} />
        <Route path="/" component={Home} />
        <Route path="*" component={Home} />
      </Switch>
    </>
  );
};

export default Routes;