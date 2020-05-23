/* eslint-disable no-useless-escape */
import React from 'react';
import './css/comment-form.css';
import UserContext from './userContext';
import $ from 'jquery';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const baseUrl = 'https://api.ajacobsson.com/comments';

class CommentForm extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      message: null,
      submitMessage: '',
      errors: {
        fullName: '',
        email: '',
        message: '',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? 'Full Name must be at least be 5 characters'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid';
        break;
      case 'message':
        errors.message =
          value.length < 1
            ? 'Comment must include some text'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email !== null && this.state.fullName !== null && this.state.message !== null) {
      if (this.validateForm(this.state.errors)) {
        this.publishComment();
      }
    }
    

  }

  openModal() {
    $('#exampleModal').modal('toggle');
  }

  async publishComment() {

    if(this.context !== null) {
      let data = {
        article: this.props.articleId,
        email: this.state.email,
        name: this.state.fullName,
        text: this.state.message
      }

      var response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.context.jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if(response.ok) {
        let submitMessage = "Thanks for commenting. Your comment will be displayed here after its reviewed."
          this.setState({
            submitMessage: submitMessage
          });
      }

    }



  }

  render() {
    const { errors } = this.state;
    return (
      <div className="comment-form-wrapper">
        <h4>Leave a Comment</h4>
        {!this.state.submitMessage ?
        <div>
          {this.context === null ?
          <p className="middle-opacity-text">You need to{String.fromCharCode(160)}
            <span className="comment-form-link" onClick={() => this.openModal()}>login</span> 
            {String.fromCharCode(160)}or{String.fromCharCode(160)}
            <span className="comment-form-link" onClick={() => this.openModal()}>register</span> 
            {String.fromCharCode(160)}
            to make a comment
          </p>: <p></p>
          }
          <div className={this.context === null ? "form-opacity-wrapper": ""}>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className='form-group'>
                <label htmlFor="fullName">Full Name</label>
                <input className="form-control" type='text' name='fullName' placeholder="Enter name" onChange={this.handleChange} noValidate />
                {errors.fullName.length > 0 &&
                  <span className='error'>{errors.fullName}</span>}
              </div>
              <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input className="form-control" type='email' name='email' placeholder="Enter email" onChange={this.handleChange} noValidate />
                {errors.email.length > 0 &&
                  <span className='error'>{errors.email}</span>}
              </div>
              <div className='form-group'>
                <textarea rows="3" className="form-control" type='text' name='message' placeholder="Comment" onChange={this.handleChange} noValidate />
                {errors.message.length > 0 &&
                  <span className='error'>{errors.message}</span>}
              </div>
              <div className='submit'>
                <button className="btn btn-secondary submit-button"> Submit</button>
              </div>
            </form>
          </div>
          </div>
          : <p className="submitMessage">{this.state.submitMessage}</p>
        }
      </div>
    );
  }
}
export default CommentForm