/* eslint-disable react/jsx-no-undef */
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React from 'react';
class Navbar extends React.Component {

render() {
  return (
    <section>
    <nav className="navbar navbar-dark bg-dark">
     <a className="navbar-brand" href="#">
      <img src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
      Anton Jacobsson
    </a>
    <ul className="nav">
    <li className="nav-item">
    <Link to="/articles">Articles</Link>
</li>
<li className="nav-item">
<Link to="/about">About</Link>
</li>
</ul>
    </nav>
  </section>
   )
 }
}
export default Navbar;