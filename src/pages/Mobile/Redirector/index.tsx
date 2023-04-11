import React from 'react'
import './style.scss'

// This page is a redirector, so it doesn't have a component
// Deep linking to this page will redirect to the app store or play store
// This page is only used for deep linking
const RedirectorPage: React.FC = () => {
  const [userAgent, setUserAgent] = React.useState('other')

  React.useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('android') > -1) {
      setUserAgent('android')
    } else if (
      ua.indexOf('iphone') > -1 ||
      ua.indexOf('ipad') ||
      ua.indexOf('ipod') > -1
    ) {
      setUserAgent('ios')
    }
  }, [])

  return (
    <div className="redirector-page container">
      <div className="redirector-page__layout">
        <div className="redirector__group">
          <div className="redirector__group-layout">
            <div className="logo">
              <div className="logo__image">
                <img src="/images/logo-white.png" alt="logo" />
              </div>
              <div className="logo__background"></div>
            </div>

            <div className="deep-link__group">
              <div className="deep-link__btn">
                <button className="btn btn--primary">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.foody.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>Mở ứng dụng</h4>
                  </a>
                </button>
              </div>
              <div className="deep-link__btn">
                <button className="btn btn--primary">
                  <a
                    href={`${
                      userAgent === 'ios'
                        ? 'https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi'
                        : userAgent === 'android'
                        ? 'https://play.google.com/store/apps/details?id=com.neoworks.hijob'
                        : ''
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>Tải app ngay</h4>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedirectorPage
