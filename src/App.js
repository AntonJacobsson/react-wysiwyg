import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import Navbar from "./navbar";
import Articles from "./articles";
import Article from "./article";
import Github from './github';
import Footer from './footer';
import './highlighter.css';
import './app.css';

class App extends React.Component {

componentDidMount() {
  ReactGA.initialize('UA-162036742-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  hotjar.initialize(1755119, 6);

}  

render() {
  return (
    <Router>
      <div className="main-container">
        <Navbar/>
        <Switch>
        <Route exact path='/' component={Articles}/>
        <Route exact path='/articles' component={Articles}/>
        <Route path='/articles/:number' component={Article}/>
        <Route path="/github" component={Github}/>
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}
  
}
export default App;