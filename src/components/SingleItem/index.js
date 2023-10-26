import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {FiX} from 'react-icons/fi'
import SavedItemsContext from '../../context/SavedItemsContext'
import './index.css'

const SingleItem = props => {
  const {details, status} = props

  const {id, title, thumbNail, viewCount, publish} = details

  const state = status === 'true' ? 'crossSingleItem2' : 'crossSingleItem'
  const date = formatDistanceToNow(new Date(publish)).slice(-8)
  const path = `/videos/${id}`
  return (
    <SavedItemsContext.Consumer>
      {value => {
        const {deleteSavedItem} = value
        const savedCrossBtnClicked = () => deleteSavedItem(id)

        return (
          <Link to={path} className="noUnderLine">
            <div className="singleCardCont">
              <img
                src={thumbNail}
                alt="video thumbnail"
                className="singleImg"
              />
              <div className="singleItemSubCont">
                <div className="singleItemHeadContainer">
                  <h1 className="singleHead">{title}</h1>

                  <button
                    className={state}
                    type="button"
                    onClick={savedCrossBtnClicked}
                  >
                    <FiX className="bannerCrossImg" />
                  </button>
                </div>
                <p className="singlePara">iB Hubs</p>
                <div className="singleItemSub2">
                  <p className="singlePara">{viewCount} views</p>
                  <p className="singlePara">.</p>
                  <p className="singlePara">{date} ago</p>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </SavedItemsContext.Consumer>
  )
}
export default SingleItem
