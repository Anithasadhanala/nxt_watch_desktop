import {Link, withRouter} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import './index.css'

const MobileSidebar = props => {
  const {details} = props

  let styleHomeImg = 'sideBarTopImg2'
  let styleGamingImg = 'sideBarTopImg2 '
  let styleTrendingImg = 'sideBarTopImg2'
  let styleSavedImg = 'sideBarTopImg2'

  if (details === 'Home') {
    styleHomeImg = 'sideBarTopImg2 redImg'
  } else if (details === 'Gaming') {
    styleGamingImg = 'sideBarTopImg2 redImg '
  } else if (details === 'Trending') {
    styleTrendingImg = 'sideBarTopImg2 redImg'
  } else if (details === 'Saved') {
    styleSavedImg = 'sideBarTopImg2 redImg'
  }
  return (
    <nav className="MobileSideBar">
      <Link to="/" className="linkBtn">
        <AiFillHome className={styleHomeImg} />
      </Link>
      <Link to="/trending" className="linkBtn">
        <AiFillFire className={styleTrendingImg} />
      </Link>
      <Link to="/gaming" className="linkBtn">
        <SiYoutubegaming className={styleGamingImg} />
      </Link>
      <Link to="/saved-videos" className="linkBtn">
        <MdPlaylistAdd className={styleSavedImg} />
      </Link>
    </nav>
  )
}
export default withRouter(MobileSidebar)
