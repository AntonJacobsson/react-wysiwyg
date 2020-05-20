/* eslint-disable no-undef */
import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Markdown } from 'react-showdown';
import { Helmet } from 'react-helmet';
import CommentForm from './comment-form';
import './css/article.css';
const strapi = new Strapi('https://api.ajacobsson.com');

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

    if (this.state.article) {
      const commentsCount = this.state.article.comments.length;
      return (
        <div>
          <Helmet>
            <title>{this.state.article.title}</title>
            <meta name="description" content={this.state.article.description} />
          </Helmet>
          <section>
            <div className="article-wrapper">

              <div className="container">
                <h1 className="article-title">{this.state.article.title}</h1>
                <div className="article-info">
                  <span className="span">{this.state.authorFirstLetter}</span>
                  <p className="lead"> {this.state.article.user.username} </p>
                  <p className="lead"> {this.state.createdDate} </p>
                </div>
                <div className="row article-content">
                  <Markdown markup={this.state.article.content} />
                </div>
                <div className="comment-section">

                  {commentsCount > 0 ? <h3>Comments:</h3> : <h3></h3>}

                  {this.state.article.comments.map(comment => {
                    return (
                      <div className="card" key={comment.id}>
                        <div className="card-header">
                          <span className="font-weight-bold">Anton Jacobsson</span> {comment.created_at}
                        </div>
                        <div className="card-body">
                          <p>{comment.text}</p>
                        </div>
                      </div>

                    )
                  })}
                    <CommentForm articleId={this.props.match.params.number}></CommentForm>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    } else {
      return <div></div>;
    }
  }
}
export default Article;