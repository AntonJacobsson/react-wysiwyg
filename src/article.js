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
      articles: [],
      createdDate: "",
    }
 }
async componentDidMount() {
 try {
   const article = await strapi.getEntry('articles', this.props.match.params.number);
    let articles = [];
    articles.push(article);

    var createdIsoTime = articles[0].created_at;
    var arr = createdIsoTime.substring(0,10).split("-");

    var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    var monthNumber = Number(
      arr[1]);
    
    var month = months[monthNumber - 1];

    var createdDateString = month + ". " +  arr[2] + ", " +  arr[0]

  this.setState({
    articles: articles,
    createdDate: createdDateString
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
        <p className="lead"> By {i.user.username} </p> 
        <p className="lead"> {this.state.createdDate} </p>
        </div>
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