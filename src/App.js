import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./navbar";
import Articles from "./articles";
import Article from "./article";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar/>

        <Switch>
        <Route exact path='/articles' component={Articles}/>
        <Route path='/articles/:number' component={Article}/>
        <Route path="/about" component={Users}/>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}