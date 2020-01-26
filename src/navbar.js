/* eslint-disable react/jsx-no-undef */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import React from 'react';
class Navbar extends React.Component {

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm custom-navbar-primary">
        <div class="container">
          <Link className={"custom-navbar-brand"} to="/">Anton Jacobsson</Link>
          <ul className="navbar-nav">

            <li className="nav-item">
              <NavLink className={"nav-link"} activeClassName="is-active" to="/articles">Articles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"nav-link"} activeClassName="is-active" to="/github">Github</NavLink>
            </li>
          </ul>
          </div>
        </nav>
      </header>
    )
  }
}
export default Navbar;