import React from 'react'
import { styled } from '@mui/material/styles'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
const WrapFooter = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  Right: 0,
  width: '100%',
  background: 'white',
  borderTop: '1px solid #ccc',
  zIndex: '2',
  height: '36px',
})
const PolicyFooter = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  zIndex: '2',
})

const Visibility = styled('div')({
  position: 'absolute',
  background: 'white',
  top: '100%',
  color: 'black',
  transition: 'all 0.4s linear',
  zIndex: '1',
  left: 0,
  right: 0,
  width: '100%',
})

const Footer = () => {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState('0')

  const handleClickOpen = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // e.isPropagationStopped()
    console.log('click', open)
    if (!open) return setOpen(true)
    setOpen(false)
  }

  return (
    <WrapFooter>
      <PolicyFooter id="div-policy-footer" onClick={handleClickOpen}>
        <a href="/policy">
          <p>Chính sách sử dụng</p>
        </a>
        <div id="div-policy-footer-right">
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <p style={{ color: '#575757' }}>Tổng đài CSKH: </p>
            <p style={{ color: '#AAAAAA', marginLeft: '5px' }}>
              (028) 35358983
            </p>
            <p style={{ color: '#575757', marginLeft: '2px' }}>
              (1.000 đồng/phút)
            </p>
          </div>
          <p style={{ color: '#575757' }}>Email: neoworks.vn@gmail.com</p>
        </div>
      </PolicyFooter>
      <Visibility
        style={
          open
            ? {
                transform: 'translateY(calc(-100% - 36px))',
              }
            : {
                transform: 'translateY(calc(0% + 36px))',
                visibility: 'hidden',
              }
        }
      >
        <CloseOutlinedIcon
          sx={{
            position: 'absolute',
            right: '12px',
            top: '12px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: '1px solid #ccc',
            fontSize: '32px',
            '&:hover': {
              color: 'red',
              background: '#AAAAAA',
            },
          }}
          onClick={handleClickOpen}
        />
        <div className="container-footer">
          <div className="footer-left">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '40%',
                marginBottom: 10,
              }}
            >
              <img src={require('../../img/langdingPage/logoHiJob.png')} />
            </div>

            <h3>Kết nối tài năng</h3>
            <p>Công ty TNHH Neo Works., LTD</p>
            <p>Địa chỉ: 79 Quốc Hương, P. Thảo Điền, Quận 2, TP HCM</p>
            <p>Đại diện pháp luật: Kim Dongha</p>
            <p>Chức vụ: Giám đốc</p>
          </div>
          <div className="footer-center">
            <h4>Về HiJob</h4>
            <a href="/policy#about-us">Về HiJob</a>

            <a href="/policy#privacy-policy"> Chính sách bảo mật </a>

            <a href="/policy#terms-of-use"> Điều khoản sử dụng </a>
          </div>
          <div className="footer-right">
            <div className="right-top">
              <h4>TẢI ỨNG DỤNG HIJOB</h4>
              <div className="div-img-footer">
                <img
                  src={require('../../img/langdingPage/QRcode-ggplay.png')}
                />
                <img
                  style={{ marginLeft: 10 }}
                  src={require('../../img/langdingPage/QRcode-appstore.png')}
                />
              </div>
              <div className="div-link-app">
                <a
                  href="https://play.google.com/store/apps/details?id=com.neoworks.hijob"
                  target="_blank"
                >
                  <img
                    id="img-gallery"
                    src={require('../../img/langdingPage/image 43.png')}
                  />
                </a>
                <a
                  href="https://apps.apple.com/vn/app/hijob-search-job-in-vietnam/id6446360701?l=vi"
                  target="_blank"
                >
                  <img src={require('../../img/langdingPage/image 45.png')} />
                </a>
              </div>
            </div>
            <div className="div-socal-link">
              <h4 style={{ color: '#0D99FF' }}>LIÊN KẾT</h4>
              <div id="div-img-socal">
                <a href="https://www.facebook.com/hijobOfficial/">
                  <img src={require('../../img/langdingPage/imagefb.png')} />
                </a>
                <a href="#">
                  <img
                    id="img-gallery"
                    src={require('../../img/langdingPage/imagein.png')}
                  />
                </a>
                <a href="#">
                  <img src={require('../../img/langdingPage/imageyou.png')} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Visibility>
    </WrapFooter>
  )
}

export default Footer
