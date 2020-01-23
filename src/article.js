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
      article: null,
      createdDate: "",
      authorFirstLetter: "",
    }
  }
  async componentDidMount() {

      var article = await this.fetchPost();

      var createdIsoTime = article.created_at;
      var arr = createdIsoTime.substring(0, 10).split("-");

      var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

      var monthNumber = Number(
         arr[1]);

       var month = months[monthNumber - 1];

       var createdDateString = month + ". " + arr[2] + ", " + arr[0];

      var firstLetterInName = article.user.username.substring(0, 1);

      this.setState({
        article: article,
        createdDate: createdDateString,
        authorFirstLetter: firstLetterInName
      });
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }
  updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  async fetchPost() {
    return await strapi.getEntry('articles', this.props.match.params.number);
  }

  render() {

    if(this.state.article) {
      return (
        <section>
              <div className="article-wrapper">
                <div className="article-header">
                  <h1 className="article-title">{this.state.article.title}</h1>
                  <div className="article-info">
  
                    <span className="span">{this.state.authorFirstLetter}</span>
                    <p className="lead"> By {this.state.article.user.username} </p>
                    <p className="lead"> {this.state.createdDate} </p>
                  </div>
                </div>
  
                <div className="container">
                  <div className="row">
                    <Markdown markup={this.state.article.content} />
                  </div>
                </div>
              </div>
        </section>
      )
    } else {
      return <div></div>;
    }
  }
}
export default Article;