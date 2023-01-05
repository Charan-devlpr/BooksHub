import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672894150/Group_7484_2x_1_arpsww.png"
      alt="not found"
      className="not-found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-content">
      we are sorry, the page you requested could not be found,
      <br /> please go back to the home page
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
