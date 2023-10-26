import './index.css'

const SthWrong = () => (
  <div className="SthWrongContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt=""
      className="sthWrongImg"
    />
    <h1 className="sthWrongHead">Oops! Something Went Wrong</h1>
    <p className="sthWrongPara">
      We are having some trouble to complete your request. Please try again.
    </p>
    <div>
      <button className="sthWrongBtn" type="button" onClick="retryBtnCliked">
        Retry
      </button>
    </div>
  </div>
)

export default SthWrong
