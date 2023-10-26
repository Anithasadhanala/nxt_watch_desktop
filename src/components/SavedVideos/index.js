import {AiFillFire} from 'react-icons/ai'
import SingleItem from '../SingleItem'
import SavedItemsContext from '../../context/SavedItemsContext'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const SavedVideos = () => {
  const failureFunction = () => (
    <>
      <Header />
      <div className="HomeBody">
        <SideBar details="Saved" />
        <div className="HomeBodySubContainer">
          <div className="notFoundContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="notFoundIMg"
            />
            <h1 className="notFoundHead">No saved videos found</h1>
            <p className="notFoundPara">
              You can save your videos while watching them.
            </p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <SavedItemsContext.Consumer>
      {value => {
        const {savedItemsList} = value

        return savedItemsList !== undefined && savedItemsList.length !== 0 ? (
          <>
            <Header />
            <div className="HomeBody">
              <SideBar details="Saved" />
              <div className="HomeBodySubContainer">
                <div className="trendingContainer" data-testid="savedVideos">
                  <div className="trendingNav">
                    <AiFillFire className="trendingImg" />
                    <h1 className="trendingHead">Saved Videos</h1>
                  </div>
                  <div className="trendingSingleContainer">
                    {savedItemsList.map(each => (
                      <SingleItem key={each.id} details={each} status="" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          failureFunction()
        )
      }}
    </SavedItemsContext.Consumer>
  )
}
export default SavedVideos
