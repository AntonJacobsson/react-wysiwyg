import React from 'react';
import { NavLink } from "react-router-dom";
import UserContext from './../userContext';
import Login from './../login';
class Navbar extends React.Component {
  static contextType = UserContext

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }


  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm custom-navbar-primary">
          
          <div className="container nav-container">
            <div>
              <NavLink className={"custom-navbar-brand"} to="/">AJacobsson</NavLink>
            </div>
            <div>
            <ul className="navbar-nav">

              <li className="nav-item">
                <NavLink className={"nav-link"} activeClassName="is-active" to="/articles">Articles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"nav-link"} activeClassName="is-active" to="/github">Github</NavLink>
              </li>
              </ul>
              </div>
              <div>
              
              </div>

          </div>
          {this.context === null ? <Login></Login> : 
          <div><button type="button" onClick={() => this.logout()}  className="btn btn-light">Log out</button></div>}
        </nav>
        {this.context === null ? <div></div> : 
        <div><p className="navbar-user-info">Logged in as: {this.context.user.username}</p></div>
        }
      </header>
    )
  }
}
export default Navbar;