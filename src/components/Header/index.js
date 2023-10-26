import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutBtnClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navBar">
      <div className="nav-logo">
        <Link to="/" data-testid="home">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="nav-logoImg"
          />
        </Link>
      </div>
      <div className="nav-subContainer">
        <button className="nav-cont-btn" type="button" data-testid="theme">
          <FaMoon className="nav-cont-img" />
        </button>

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
          alt="profile"
          className="nav-cont-img"
        />

        <div className=" popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button logoutBtn">
                Logout
              </button>
            }
          >
            {close => (
              <div className="cont">
                <div className="">
                  <p className="popoutPara">
                    Are you sure, you want to logout?
                  </p>
                </div>
                <button
                  type="button"
                  className=" popoutBtn closeBtn"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className=" popoutBtn confirmBtn"
                  onClick={logoutBtnClicked}
                >
                  Confirm
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
