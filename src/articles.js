import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import './articles.css';
import { Link } from "react-router-dom";

const strapi = new Strapi('https://api.ajacobsson.com');

class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      filters: []
    }
  }

  formatDate = (time) => {
    return time.substring(0, 10);;
  }

  addFilterOnClick(tagName) {

    var tags = this.state.filters;
    if (!tags.includes(tagName)) {
      tags.push(tagName);
      this.setState({
        filters: tags
      });
    }
  }
  removeFilterOnClick(tagName) {

    var tags = this.state.filters;
    if (tags.includes(tagName)) {
      tags = tags.filter(x => x !== tagName);
      this.setState({
        filters: tags
      });
    }
  }

  async componentDidMount() {
    try {
      const posts = await strapi.getEntries('articles')
      console.log(posts);
      this.setState({
        articles: posts,
      })
    }
    catch (err) {
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

          <div className="row">
            <div className="card-body fixed-height-card">
              {this.state.filters.map(tag => {
                return (
                  <button key={tag} type="button" className="btn btn-outline-secondary custom-button-badge" onClick={() => this.removeFilterOnClick(tag)} >{tag}<span className="button-close-symbol">&#10006;</span></button>
                )
              })}
            </div>
          </div>

          {this.state.articles.map(i => {
            if (this.state.filters.length === 0 || i.tags.some(r => this.state.filters.includes(r.name)) === true) {
              return (
                <div className="row" key={i.id}>
                  <div>
                    <div className="card-body">

                      <Link to={`/articles/${i.id}/${i.link}`}><h5 className="articles-title">{i.title}</h5></Link>

                      <div className="article-middle">
                        <span className="articles-span">{i.user.username.substring(0, 1)}</span>
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
                      <div className="articles-badge-row">
                        {i.tags.map(tag => {
                          return (
                            <button key={tag} type="button" className="btn btn-outline-secondary custom-button-badge" onClick={() => this.addFilterOnClick(tag.name)} >{tag.name}</button>
                          )
                        })}
                        <Link to={`/articles/${i.id}/${i.link}`}><span>Continue reading..</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } else {
              return <span key={i.id}></span>;
            }
          })}
        </div>
      </section>

    )

  }
}
export default Articles;