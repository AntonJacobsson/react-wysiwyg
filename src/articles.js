/* eslint-disable no-undef */
import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import './articles.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  const strapi = new Strapi('http://104.41.228.118:1337');

  
class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
 }

 formatDate = (time) =>  {
  return time.substring(0, 10);;
 }
 
async componentDidMount() {
 try {
   const posts = await strapi.getEntries('articles')
  console.log(posts);
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
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                      <h1 className="display-4">Articles</h1>
                       <p className="lead">Here you can find articles about software development</p>
                    </div>
                </div>

      <div className="container">
      {this.state.articles.map(i => {
            return(
              <div className="row">
                <div>
                <div className="card-body">
                  
                  <Link to={`/articles/${i.id}/${i.link}`}><h5 className="articles-title">{i.title}</h5></Link>
                  
                  <div className="article-middle">
                    <span className="articles-span">{i.user.username.substring(0,1)}</span>
                    <div>
                    <span>Author</span>
                    <span>{i.user.username}</span>
                    </div>
                    <div>
                    <span>Published</span>
                    <span>{i.created_at.substring(0, 10)}</span>
                      </div>
                 </div>
                  
                  <p className="card-text">{i.description}</p>
                  <div class="articles-badge-row">
                  <span class="badge badge-pill badge-secondary articles-badge">Secondary</span>
                  <span class="badge badge-pill badge-secondary articles-badge">Secondary</span>
                    <Link to={`/articles/${i.id}/${i.link}`}><span>Continue reading..</span></Link>
                  </div>
                </div>
              </div>
              </div>
            )
          })}
          </div>
    </section>
    
   )
   
 }
}
export default Articles;