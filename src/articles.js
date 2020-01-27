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
      articles: [],
      filters: []
    }
 }

 formatDate = (time) =>  {
  return time.substring(0, 10);;
 }

 addFilterOnClick = (tagName) => {

   var tags = this.state.filters;
   tags.push(tagName);

   this.setState({
    filters: tags
   });
   console.log(tags);
 }
 
async componentDidMount() {
 try {
   const posts = await strapi.getEntries('articles')
  console.log(posts);
  this.setState({
    articles: posts,
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

      {/* <span>active filters: </span>
          {this.state.filters.map(i => {
            return(
              <span>{i}</span>
            )
      })} */}

      {this.state.articles.map(i => {
        if(this.state.filters.length == 0 || i.tags.some(r=> this.state.filters.includes(r.name)) == true) {
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
                    {i.tags.map(tag => {
                      return (
                        <button type="button" class="btn btn-outline-secondary custom-button-badge" onClick={() => this.addFilterOnClick(tag.name)} >{tag.name}</button>
                      )
                    })}
                    <Link to={`/articles/${i.id}/${i.link}`}><span>Continue reading..</span></Link>
                  </div>
                </div>
              </div>
              </div>
            )
                  } else {
                    return;
                  }
          })}
          </div>
    </section>
    
   )
   
 }
}
export default Articles;