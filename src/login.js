import React from "react";
import $ from 'jquery';
import './css/login.css';
const loginUrl = 'https://api.ajacobsson.com/auth/local';
const registerUrl = 'https://api.ajacobsson.com/auth/local/register'

class Login extends React.Component {


    constructor() {
        super();
        this.state = {
            identifier : '',
            password : '',
            isRegister: false,
            registerUsername: '',
            registerPassword: '',
            registerEmail: '',
            errorMessage: '',
            successMessage: '',
        }
      }
    handleChange = (e) =>{ 
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({ [name]: value });
      }


clearState() {
  this.setState({
    identifier: '',
    password: '',
    registerEmail: '',
    registerPassword: '',
    registerUsername: '',
    errorMessage: '',
    successMessage: '',
  })
}

async login() {

        var isValid = this.validateLogin();

        if (isValid) {
          this.clearState();

          let data = {
            identifier: this.state.identifier,
            password: this.state.password,
          }
    
        var response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
            let data = await response.json();
             sessionStorage.setItem('user', JSON.stringify(data));
                 $('#exampleModal').modal('toggle');
                 window.location.reload();
        } else {
          this.setState({
            errorMessage: 'Username and password were not correct'
          });
        }   
        }
}

validateLogin() {
  if(this.state.identifier === '' || this.state.password === '') {
    this.setState({
      errorMessage: 'Identifier or password is missing'
    })
    return false;

  }
  this.setState({
    errorMessage: ''
  })
  return true;
}

validateRegister() {
  if(this.state.registerEmail === '' || this.state.registerPassword === '' || this.state.registerUsername === '') {
    this.setState({
      errorMessage: 'Username, email or password is missing'
    })
    return false;

  }
  this.setState({
    errorMessage: ''
  })
  return true;
}


setRegister() {
  this.setState({
    isRegister: true,
    errorMessage: '',
    successMessage: ''
  })
}
setLogin() {
  this.setState({
    isRegister: false,
    errorMessage: '',
    successMessage: ''
  })
}

async register() {
  
  var isValid = this.validateRegister();

  if (isValid) {

    let data = {
      username: this.state.registerUsername,
      email: this.state.registerEmail,
      password: this.state.registerPassword,
  }
  
    var response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      this.clearState();
      this.setState({
        successMessage: 'Your account was created. Now you can login'
      });
    } else {
      this.setState({
        errorMessage: 'Something went wrong, try again later'
      });
    } 
  }
}

render() {
  return (
      <div>
    <button type="button" className="btn btn-light" data-toggle="modal" data-target="#exampleModal">
  Login
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
      {!this.state.isRegister ? 
        <h5 className="modal-title" id="exampleModalLabel">Login</h5>
        : <h5 className="modal-title" id="exampleModalLabel">Register</h5>
      }
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {!this.state.isRegister ? 
      <form>
              <div className='form-group'>
                <label htmlFor="identifier">Username or Email</label>
                <input className="form-control" type='text' name='identifier' value={this.state.identifier} onChange={this.handleChange} noValidate/>
              </div>
              <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input className="form-control" type='password' name='password' value={this.state.password} onChange={this.handleChange} noValidate/>
              </div>
        </form> : 
        <form>
              <div className='form-group'>
                <label htmlFor="registerUsername">Username</label>
                <input className="form-control" type='text' name='registerUsername' value={this.state.registerUsername} onChange={this.handleChange} noValidate/>
              </div>
              <div className='form-group'>
                <label htmlFor="registerEmail">Email</label>
                <input className="form-control" type='text' name='registerEmail'value={this.state.registerEmail} onChange={this.handleChange} noValidate/>
              </div>
              <div className='form-group'>
                <label htmlFor="registerPassword">Password</label>
                <input className="form-control" type='password' name='registerPassword' value={this.state.registerPassword} onChange={this.handleChange} noValidate/>
              </div>
        </form>

        }
                <p className="errorMsg">
                  {this.state.errorMessage}  
                </p>
                <p className="successMsg">
                  {this.state.successMessage}  
                </p>
      </div>
      <div className="modal-footer">
        {!this.state.isRegister ? 
        <p className="modal-footer-register" onClick={() => this.setRegister()}>Register here</p>
        : <p className="modal-footer-register" onClick={() => this.setLogin()}>Go back to Login</p>
        }
        <button type="button" className="btn btn-secondary"  data-dismiss="modal">Cancel</button>
        {!this.state.isRegister ?
        <button type="button" className="btn custom-btn-primary" data-dismiss="" onClick={() => this.login()}>Login</button> :
        <button type="button" className="btn custom-btn-primary" data-dismiss="" onClick={() => this.register()}>Register</button>
      }
      </div>
    </div>
  </div>
</div>
</div>
  );
}
  
}
export default Login;