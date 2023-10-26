import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const SearchItem = props => {
  const {details} = props
  const {title, thumbNail, viewCount, name, publish, profileImg, id} = details
  const path = `/videos/${id}`

  const date = formatDistanceToNow(new Date(publish)).slice(-8)
  return (
    <Link to={path} className="linked">
      <div className="searchItemContainer2">
        <img src={thumbNail} alt="video thumbnail" className="searchItemImg" />
        <div className="searchItemSubContainer">
          <img src={profileImg} alt="channel logo" className="searchItemImg2" />
          <div className="SearchItemDetails">
            <p className="searchItemPara">{title}</p>
            <p className="searchItem2">{name}</p>
            <div className="searchItemInfoCont">
              <p className="searchItemViews">{viewCount} views</p>
              <p className="dot">.</p>
              <p className="searchItemViews"> {date} ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default SearchItem
