import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'


const Footer: React.FC = () => {
    return (
        <div>


            <div className='container-footer'>
                <div className='footer-left'>
                    <img src={require('../../img/langdingPage/logoH.png')} />
                    <h3>Kết nối tài năng</h3>
                    <p>Công ty TNHH AI Works</p>
                    <p>Địa chỉ: 79 Quốc Hương, P. Thảo Điền, Quận 2, TP HCM</p>
                    <p>Đại diện pháp luật: Kim Dongha</p>
                    <p>Chức vụ: Giám đốc</p>
                </div>

                <div className='footer-center'>
                    <h4>Về Hi Job</h4>
                    <a href='/policy#about-us'>Về Hi Job</a>

                    <a href='/policy#privacy-policy'>  Chính sách bảo mật </a>

                    <a href='/policy#terms-of-use'>  Điều khoản sử dụng </a>

                </div>
                <div className='footer-right'>
                    <div className='right-top' >
                        <h4>TẢI ỨNG DỤNG HI JOB</h4>
                        <div className='div-img-footer'>
                            <img src={require('../../img/langdingPage/QRcode-ggplay.png')} />
                            <img style={{ marginLeft: 10 }} src={require('../../img/langdingPage/QRcode-appstore.png')} />
                        </div>
                        <div className='div-link-app'>
                            <a href='https://bit.ly/3m3vE3W' target='_blank'>
                                <img id='img-gallery' src={require('../../img/langdingPage/image 43.png')} />
                            </a>
                            <a href='http://bit.ly/3KF5JZS' target='_blank' >
                                <img src={require('../../img/langdingPage/image 45.png')} />
                            </a>

                        </div>
                    </div>
                    <div className='div-socal-link'>
                        <h4 style={{ color: "#0D99FF" }}>LIÊN KẾT</h4>
                        <div id='div-img-socal'>
                            <a href='https://www.facebook.com/hijobOfficial/'>
                                <img src={require('../../img/langdingPage/imagefb.png')} />
                            </a>
                            <a href='#'>
                                <img id='img-gallery' src={require('../../img/langdingPage/imagein.png')} />
                            </a>
                            <a href='#'>
                                <img src={require('../../img/langdingPage/imageyou.png')} />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <div id='div-policy-footer'>
                <a href="/policy"> <p>Chính sách sử dụng</p> </a>
                <div id='div-policy-footer-right'>
                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <p style={{ color: "#575757" }}>Tổng đài CSKH:  </p>
                        <p style={{ color: "#AAAAAA", marginLeft: "5px" }}>19001234</p>
                        <p style={{ color: "#575757", marginLeft: "2px" }}>(1.000 đồng/phút)</p>
                    </div>

                    <p style={{ color: "#575757" }}>Email: aiwords@gmail.com</p>
                </div>
            </div>
        </div>



    )
}

export default Footer
