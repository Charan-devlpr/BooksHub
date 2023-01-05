import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div className="icons">
      <button type="button" className="logo">
        <FaGoogle />
      </button>
      <button type="button" className="logo">
        <FaTwitter />
      </button>
      <button type="button" className="logo">
        <FaInstagram />
      </button>
      <button type="button" className="logo">
        <FaYoutube />
      </button>
    </div>
    <p className="footer-text">Contact Us</p>
  </div>
)

export default Footer
