import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactGA from 'react-ga';
import Navbar from "./navbar";
import Articles from "./articles";
import Article from "./article";
import Github from './github';


ReactGA.initialize('UA-162036742-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
