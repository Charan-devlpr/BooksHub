import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickedLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <Link to="/">
        <div className="container">
          <img
            src="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672811169/Group_7730_2x_1_xsumg4.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="bookHub-text">ookHub</h1>
        </div>
      </Link>
      <div className="container">
        <ul className="unOrder-items">
          <Link to="/">
            <li className="list-items">Home</li>
          </Link>
          <Link to="/bookshelves">
            <li className="list-items">Bookshelves</li>
          </Link>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickedLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
