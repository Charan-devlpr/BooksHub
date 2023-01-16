import Cookies from 'js-cookie'
import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {homeTabStatus: true, bookShelfTabStatus: false}

  onClickedLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickedHomeTab = () => {
    this.setState({homeTabStatus: true, bookShelfTabStatus: false})
  }

  onClickedBookShelfTab = () => {
    this.setState({bookShelfTabStatus: true, homeTabStatus: false})
  }

  render() {
    const {homeTabStatus, bookShelfTabStatus} = this.state
    const homeTabColor = homeTabStatus ? 'active-nav-item' : 'nav-item'
    const bookShelfColor = bookShelfTabStatus ? 'active-nav-item' : 'nav-item'
    return (
      <div>
        <nav className="navbar-container">
          <Link to="/" className="link-item">
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
              <Link to="/" className="link-item">
                <li className={homeTabColor} onClick={this.onClickedHomeTab}>
                  Home
                </li>
              </Link>
              <Link to="/shelf" className="link-item">
                <li
                  className={bookShelfColor}
                  onClick={this.onClickedBookShelfTab}
                >
                  Bookshelves
                </li>
              </Link>
            </ul>
            <button
              className="logout-btn"
              type="button"
              onClick={this.onClickedLogout}
            >
              Logout
            </button>
          </div>
        </nav>
        <nav className="small-navbar-container">
          <Link to="/" className="link-item">
            <div className="container">
              <img
                src="https://res.cloudinary.com/dxqcmp4il/image/upload/v1672811169/Group_7730_2x_1_xsumg4.png"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="bookHub-text">ookHub</h1>
            </div>
          </Link>
          <GiHamburgerMenu className="hamburger" />
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
