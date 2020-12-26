import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Account,
  AllChievs,
  AllCommunities,
  ChievDetail,
  Community,
  FullStream,
  TopChievers,
  Home,
  Submissions,
} from "./views";
import About from "./views/About";
const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/submissions" component={Submissions} />
        <Route path="/about" component={About} />
        <Route path="/account/:addr" component={Account} />
        <Route path="/account" component={Account} />
        <Route path="/chievs" component={AllChievs} />
        <Route path="/chiev/:tokenId" component={ChievDetail} />
        <Route path="/communities" component={AllCommunities} />
        <Route path="/community/:addr" component={Community} />
        <Route path="/stream" component={FullStream} />
        <Route path="/top" component={TopChievers} />
        <Route path="/" component={Home} />
        <Route path="*" component={Home} />
      </Switch>
    </>
  );
};

export default Routes;
