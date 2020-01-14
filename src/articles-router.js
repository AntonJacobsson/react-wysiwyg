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


render() {

  return (
    <Switch>
      <Route exact path='/articles' component={Articles}/>
      <Route path='/articles/:number/:string' component={Article}/>
    </Switch>
    
   )
   
 }
}
export default ArticlesRouter;