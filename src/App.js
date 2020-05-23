import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import Navbar from "./components/navbar";
import Articles from "./articles";
import Article from "./article";
import Github from './github';
import Footer from './components/footer';
import './css/highlighter.css';
import './css/app.css';
import UserProvider from './userContext';

class App extends React.Component {

componentDidMount() {
  ReactGA.initialize('UA-162036742-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  hotjar.initialize(1755119, 6);
}

getUserFromSessionStorage() {
  var data = sessionStorage.getItem('user');
  if (data !== null) {
    try {
      return JSON.parse(data);
    } catch {
      sessionStorage.clear();
    }
  }
  return null
}

render() {
  return (
    <UserProvider.Provider value={this.getUserFromSessionStorage()}>
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
    </UserProvider.Provider>
  );
}
  
}
export default App;