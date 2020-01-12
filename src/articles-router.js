import React from 'react';
import {
    BrowserRouter as
    Switch,
    Route
  } from "react-router-dom";
  import Articles from "./articles";  
  import Article from "./article";

  
class ArticlesRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
 }
 componentDidUpdate() {
   console.log("hej");
 }
 
 


render() {

  return (
    <Switch>
      <Route exact path='/articles' component={Articles}/>
      <Route path='/articles/:number' component={Article}/>
    </Switch>
    
   )
   
 }
}
export default ArticlesRouter;