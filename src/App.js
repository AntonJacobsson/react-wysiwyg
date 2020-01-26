import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./navbar";
import Articles from "./articles";
import Article from "./article";
import Github from './github';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar/>

        <Switch>
        <Route exact path='/' component={Articles}/>
        <Route exact path='/articles' component={Articles}/>
        <Route path='/articles/:number' component={Article}/>
        <Route path="/github" component={Github}/>
        </Switch>
      </div>
    </Router>
  );
}
