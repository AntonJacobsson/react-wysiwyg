/* eslint-disable no-undef */
import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
const strapi = new Strapi('http://127.0.0.1:1337');

  
class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
 }

 
 
async componentDidMount() {
 try {
   const posts = await strapi.getEntries('articles')

  this.setState({
    articles: posts
  })
 } 
 catch(err) {
  alert(err);
 }
}



render() {

  return (
    <section>
      <div>
      </div>
      {this.state.articles.map(i => {
          
            return(
                <div>
                <Link to={`/articles/${i.id}`}>hej</Link>
                <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{i.title}</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
              </div>
            )
          })}
    </section>
    
   )
   
 }
}
export default Articles;