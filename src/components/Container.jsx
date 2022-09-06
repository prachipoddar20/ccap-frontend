import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import AuthenticatedRoute from '../routes/AuthenticatedRoute';
import Login from './Login';
import DashBoard from './DashBoard';
import Home from './Home';
import NotFound from './NotFound';
import Unauthorized from './Unauthorized';
import NewApplication from './NewApplication';
import SignUp from './SignUp';
import ApproverQueue from './ApproverQueue';
import IssuerQueue from './IssuerQueue';
import ShowApplication from './ShowApplication';
import AuthorizedRoute from '../routes/AuthorizedRoute';
import StaffSignUp from './StaffSignUp';


const Container = (props) => {
  return (
    <Fragment>
      <div className="container p-5">
        <Switch>
          {/* User dashboard */}
          <Route exact path="/login" component={Login} />
          <AuthenticatedRoute
            exact
            path="/authenticated"
            component={DashBoard}
          />
          {/* Sign up page */}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Home} />
          <AuthorizedRoute
            exact
            path="/authorized"
            role="admin"
            component={Home}
          />
          {/* Staff SignUp */}
          <AuthorizedRoute
            exact
            path="/staff-sign-up"
            role="admin"
            component={StaffSignUp}
          />
          {/* Approver page */}
          <AuthorizedRoute
            exact
            path="/approve"
            role="approver"
            component={ApproverQueue}
          />
          {/* Issuer page */}
          <AuthorizedRoute
            exact
            path="/issuer"
            role="issuer"
            component={IssuerQueue}
          />
          {/* Show the application */}
          <AuthorizedRoute
            exact
            path="/show-application"
            role="issuer,approver"
            component={ShowApplication}
          />
          {/* New application page */}
          <AuthenticatedRoute
            exact
            path="/apply-new/:id"
            role="user"
            component={NewApplication}
          />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Container;
