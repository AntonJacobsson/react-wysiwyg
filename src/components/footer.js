import React from 'react';
import { FaGithub } from "react-icons/fa";
import './../css/footer.css';
class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="footer-icons">
          <a href="https://github.com/AntonJacobsson">
            <FaGithub className="fa fa-2" />
          </a>
        </div>
      </footer>
    )
  }
}
export default Footer;