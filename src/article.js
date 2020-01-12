/* eslint-disable no-undef */
import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Markdown } from 'react-showdown';
import './article.css';
const strapi = new Strapi('http://localhost:1337');
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

render() {

  return (
    <section>
      {this.state.articles.map(i => {
            return(
              <div>
                <h1>{i.title}</h1>
                <Markdown markup={ i.content } />
              </div>
            )
          })}

     
    </section>
   )
 }
}
export default Article;