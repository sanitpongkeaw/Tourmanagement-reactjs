import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AgentLayout from "layouts/Agent.js";
import AuthLayout from "layouts/Auth.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/agent" render={(props) => <AgentLayout {...props} />} />
      <Redirect from="/" to={localStorage.getItem('status') === '1729384732' ? "/admin/index" : "/agent/index"} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
