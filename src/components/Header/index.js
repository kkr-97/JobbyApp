import {withRouter, Link} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('./login')
  }

  return (
    <nav className="header-nav-container">
      <div className="logo-img-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo-img"
          />
        </Link>
      </div>
      <div className="large-device-container">
        <ul className="nav-list-container">
          <Link to="/" className="link-item">
            <li className="nav-list-item">
              <p className="nav-list-content">Home</p>
            </li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="nav-list-item">
              <p className="nav-list-content">Jobs</p>
            </li>
          </Link>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="small-device-container">
        <ul className="nav-list-container">
          <Link to="/">
            <li className="nav-list-item">
              <button type="button" className="nav-btn">
                <FaHome className="icon" />
                {}
              </button>
            </li>
          </Link>
          <Link to="/jobs">
            <li className="nav-list-item">
              <button type="button" className="nav-btn">
                <MdWork className="icon" />
                {}
              </button>
            </li>
          </Link>
        </ul>
        <button className="dummy-btn" type="button">
          <FiLogOut className="icon" onClick={onClickLogout} />
          {}
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
