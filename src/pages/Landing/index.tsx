import React from 'react'
// @ts-ignore

import NaviBar from '../Landing/components/navBar'
import { Navbar } from '../../components'
import ItemInfoLeft from '../Landing/components/item/itemInfoLeft'
import ItemInfoRight from '../Landing/components/item/itemInfoRight'
import Popup from './popup/index'
import useModal from './popup/useModal'
import Footer from '../../components/Footer/index'
import './style.scss'

const Landing: React.FC = () => {
  console.log('Home page here')
  const { isOpen, toggle } = useModal()
  React.useEffect(() => {
    // toggle()
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [isOpen])
  return (
    <div className="home">
      {/* <Navbar /> */}
      <div
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          marginTop: '88px',
          paddingTop: '24px',
        }}
        className="banner"
      >
        <div
          style={{
            flexDirection: 'column',
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <img
            className="logo_hi_job"
            style={{}}
            src={require('../../img/langdingPage/logoHiJob-nopadding.png')}
          />
          <div
            style={{ padding: 20, justifyContent: 'space-around' }}
            className="describe"
          >
            <p
              id="p1"
              style={{
                color: '#0D99FF',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Kết nối tài năng
            </p>
            <p className="p2" style={{ textAlign: 'center', color: '#0D99FF' }}>
              Đưa tài năng của bạn <br />
              đến với doanh nghiệp
            </p>
          </div>
          <div className="div-info-app">
            <div className="div-qrcode">
              <img
                className="img-qrcode"
                src={require('../../img/langdingPage/QRcode-ggplay.png')}
              />
              <img
                className="img-qrcode"
                src={require('../../img/langdingPage/QRcode-appstore.png')}
              />
            </div>
            <div className="div-dow">
              <a
                href="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                target="_blank"
              >
                <img src={require('../../img/langdingPage/image 43.png')} />
              </a>

              <a
                href="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                target="_blank"
              >
                <img src={require('../../img/langdingPage/image 45.png')} />
              </a>
            </div>
          </div>
        </div>
        <div className="div-banner-right">
          <img id="img-left" src={require('../../img/langdingPage/Home.png')} />
          <img
            id="img-right"
            src={require('../../img/langdingPage/history2.png')}
          />
          <img
            id="img-center"
            src={require('../../img/langdingPage/Job Detail.png')}
          />
        </div>
        <div id="space-banner"></div>
      </div>
      <div className="item">
        <ItemInfoLeft
          imageDescription={'/images/image 50.png'}
          content="Artificial Intelligence"
          describe="Công ty chúng tôi cung cấp việc làm AI cho những ai quan tâm đến Machine Learning, Artificial Intelligence,..."
          titleButton="Liên hệ với chúng tôi "
          tagId="us"
        />
        <ItemInfoRight
          imageDescription={'/images/image 51.png'}
          content="Software Solutions"
          describe="Bạn đang tìm kiếm phần mềm hoạch định nguồn lực doanh nghiệp? Chúng tôi có giải pháp tốt nhất cho điều đó."
        />
        <ItemInfoLeft
          imageDescription={'/images/unsplash_Zyx1bK9mqmA.png'}
          content="Be one of us!"
          describe="“Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau”
          Trở thành đồng đội của chúng tôi và cùng nhau xây dựng 1 team cùng phát triển."
          titleButton="Neoworks Career"
          imgBackground={'/images/Background.png'}
          tagId="career"
        />
      </div>

      <Popup isOpen={isOpen} toggle={toggle}></Popup>
      <Footer />
    </div>
  )
}

export default Landing
