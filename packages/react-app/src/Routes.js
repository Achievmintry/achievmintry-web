import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {Account, AllChievs, AllCommunities, Community, Home, SnapShot, Submissions }from "./views"
const Routes = () => {
    return (
      <>
        <Switch>
        <Route path="/submissions" component={Submissions} />
        <Route path="/snapshot" component={SnapShot} />
        <Route path="/account/:addr" component={Account} />
        <Route path="/account" component={Account} />
        <Route path="/chievs" component={AllChievs} />
        <Route path="/communities" component={AllCommunities} />
        <Route path="/community/:addr" component={Community} />
        <Route path="/" component={Home} />
        <Route path="*" component={Home} />
      </Switch>
    </>
  );
};

export default Routes;