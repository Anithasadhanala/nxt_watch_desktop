import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import './index.css'

const SideBar = props => {
  const {details} = props
  let styleHome = 'sideBarTopItem'
  let styleHomeImg = 'sideBarTopImg'
  let styleGaming = 'sideBarTopItem'
  let styleGamingImg = 'sideBarTopImg '
  let styleTrending = 'sideBarTopItem'
  let styleTrendingImg = 'sideBarTopImg '
  let styleSaved = 'sideBarTopItem'
  let styleSavedImg = 'sideBarTopImg '

  if (details === 'Home') {
    styleHome = 'sideBarTopItem white'
    styleHomeImg = 'sideBarTopImg redImg'
  } else if (details === 'Gaming') {
    styleGaming = 'sideBarTopItem white'
    styleGamingImg = 'sideBarTopImg redImg '
  } else if (details === 'Trending') {
    styleTrending = 'sideBarTopItem white'
    styleTrendingImg = 'sideBarTopImg redImg'
  } else if (details === 'Saved') {
    styleSaved = 'sideBarTopItem white'
    styleSavedImg = 'sideBarTopImg redImg'
  }
  return (
    <div className="sideBar">
      <div className="sideBarTopCont">
        <Link to="/" className="linkBtn">
          <div className={styleHome}>
            <AiFillHome className={styleHomeImg} />
            <h1 className="sideBarTopContHeader">Home</h1>
          </div>
        </Link>
        <Link to="/trending" className="linkBtn">
          <div className={styleTrending}>
            <AiFillFire className={styleTrendingImg} />
            <h1 className="sideBarTopContHeader">Trending</h1>
          </div>
        </Link>
        <Link to="/gaming" className="linkBtn">
          <div className={styleGaming}>
            <SiYoutubegaming className={styleGamingImg} />
            <h1 className="sideBarTopContHeader">Gaming</h1>
          </div>
        </Link>
        <Link to="/saved-videos" className="linkBtn">
          <div className={styleSaved}>
            <MdPlaylistAdd className={styleSavedImg} />
            <h1 className="sideBarTopContHeader">Saved videos</h1>
          </div>
        </Link>
      </div>

      <div className="sideBarBottomCont">
        <p className="sideBarContact">CONTACT US</p>
        <div className="sideBarBottomContactDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
            alt="facebook logo"
            className="sideBarBottomImg"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
            alt="twitter logo"
            className="sideBarBottomImg"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="sideBarBottomImg"
          />
        </div>
        <p className="contactPara">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )
}
export default SideBar
