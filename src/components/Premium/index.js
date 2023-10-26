import {FiX} from 'react-icons/fi'
import './index.css'

const Premium = props => {
  const {premiumClicked} = props

  const crossBtnPremiumClicked = () => {
    premiumClicked()
  }
  return (
    <div className="bannerBgContainer" data-testid="banner">
      <div className="bannerNav">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          className="bannerLogo"
        />
        <div>
          <button
            className="bannerCross"
            type="button"
            data-testid="close"
            onClick={crossBtnPremiumClicked}
          >
            <FiX className="bannerCrossImg" />
          </button>
        </div>
      </div>
      <p className="bannerPara">Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button className="bannerBtn" type="button">
        GET IT NOW
      </button>
    </div>
  )
}
export default Premium
