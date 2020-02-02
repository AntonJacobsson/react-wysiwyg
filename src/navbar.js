import React from 'react';
import { NavLink } from "react-router-dom";
class Navbar extends React.Component {

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm custom-navbar-primary">
          <div className="container">
            <NavLink className={"custom-navbar-brand"} to="/">Anton Jacobsson</NavLink>
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