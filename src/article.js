/* eslint-disable no-undef */
import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Markdown, Showdown } from 'react-showdown';
import './article.css';
const strapi = new Strapi('http://104.41.228.118:1337');
class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
 }
async componentDidMount() {
 try {
   const posts = await strapi.getEntry('articles', this.props.match.params.number);
    let postList = [];
    postList.push(posts);
  console.log(posts);
  this.setState({
    articles: postList
  })
 } 
 catch(err) {
  alert(err);
 }
}


/* <div class="blog-header">
      <div class="container">
        <h1 class="blog-title">The Bootstrap Blog</h1>
        <p class="lead blog-description">An example blog template built with Bootstrap.</p>
      </div>
    </div> */


render() {

  return (
    <section>
      {this.state.articles.map(i => {
            return(
              <div className="article-wrapper">
      <div className="article-header">
        <h1 className="article-title">{i.title}</h1>
        <div className="article-info">
        
        <span className="span">A</span>
        <p className="lead blog-description"> {i.created_at} </p>


       
        </div>
        <p className="lead blog-description"> {i.user.username} </p> 
      </div>


                <div className="container">
                <div className="row">
                <Markdown markup={ i.content } />
                </div>
                </div>
              </div>
            )
          })}

     
    </section>
   )
 }
}
export default Article;