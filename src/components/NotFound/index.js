import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="HomeBody">
      <SideBar />
      <div className="HomeBodySubContainer">
        <div className="notFoundContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
            className="notFoundIMg"
          />
          <h1 className="notFoundHead">Page Not Found</h1>
          <p className="notFoundPara">
            We are sorry, the page you requested could not be found.
          </p>
        </div>
      </div>
    </div>
  </>
)
export default NotFound
