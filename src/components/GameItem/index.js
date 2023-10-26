import {Link} from 'react-router-dom'
import './index.css'

const GameItem = props => {
  const {details} = props
  const {id, thumbNail, title, viewCount} = details

  const path = `/videos/${id}`
  return (
    <Link to={path} className="noUnderLine">
      <div className="GamesItemContainer">
        <img src={thumbNail} alt="video thumbnail" className="GamesItemImg" />
        <div className="GamesItemSubCont">
          <h1 className="GamersItemHead">{title}</h1>
          <p className="GameItemPara">{viewCount} Watching Worldwide</p>
        </div>
      </div>
    </Link>
  )
}
export default GameItem
