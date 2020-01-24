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
//     <header>
//     <nav className="navbar navbar-dark bg-dark">
//     <Link to="/articles">Anton Jacobsson</Link>
//     <ul className="nav">
//     <li className="nav-item">
//     
// </li>
// <li className="nav-item">
// <Link to="/about">About</Link>
// </li>
// </ul>
//     </nav>
//   </header>
<header>
  <nav className="navbar navbar-expand-sm custom-navbar-primary">
    <a className="custom-navbar-brand" href="#">Navbar</a>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

      <li className="nav-item">
      <Link className={"nav-link"} to="/articles">Articles</Link>
      </li>
      <li className="nav-item">
      <Link className={"nav-link"} to="/about">About</Link>
      </li>
      <li className="nav-item">
      <Link className={"nav-link"} to="/github">Github</Link>
      </li>
    </ul>
  </nav>
</header>
   )
 }
}
export default Navbar;