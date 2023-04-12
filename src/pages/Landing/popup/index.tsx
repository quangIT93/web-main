import React, { ReactNode } from "react";
import { CloseOutlined, DiffFilled } from '@ant-design/icons';

import "./style.scss"

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

const Modal = (props: ModalType) => {
    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay" onClick={props.toggle}>
                    <div className="modal-box">
                        <div id="div-test" style={{ paddingTop: 60, paddingLeft: 60, paddingRight: 10 }}>
                            <div id="div-container-popup">
                                <div id="div-close" style={{ width: "100%" }}>
                                    <a href="#" onClick={props.toggle}><CloseOutlined style={{ color: "white", fontSize: 20 }} /></a>
                                </div>
                                <div id="div-content-popup">
                                    <img src={require("../../../img/langdingPage/_image.png")} />
                                    <div id="div-content-right">
                                        <div>
                                            <h3 className="text-title">Ứng tuyển nhiều công việc hấp dẫn</h3>
                                            <h2 className="text-title">Tải ứng dụng Hi Job ngay!</h2>
                                        </div>
                                        <div id="div-popup-content-bottom">

                                            <div>
                                                <img src={require("../../../img/langdingPage/imageQR.png")} />
                                                <p className="text-title">Quét mã QR code</p>
                                            </div>

                                            <div className='div-popup-link-app'>
                                                <a href='http://bit.ly/3KF5JZS' target='_blank' >

                                                    <img src={require('../../../img/langdingPage/image 45.png')} />
                                                </a>
                                                <a href='https://bit.ly/3m3vE3W' target='_blank'>
                                                    <img id='img-gallery' src={require('../../../img/langdingPage/image 43.png')} />
                                                </a>
                                                <a href=''>
                                                    <img src={require('../../../img/langdingPage/image 44.png')} />

                                                </a>
                                                <p className="text-title">Quét mã QR code</p>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal
