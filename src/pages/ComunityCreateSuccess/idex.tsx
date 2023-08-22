import React, { useEffect, FormEvent, useState } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
// import moment, { Moment } from 'moment';
// @ts-ignore

import { Navbar } from '#components';

import './style.scss';

import { Button } from 'antd';
import RollTop from '#components/RollTop';

const ComunityCreateSuccess = () => {

    return (
        <div className="comunity-create-success-container">
            <Navbar />
            <div className="comunity-create-success-content">
                <div className="create-success-message">
                    <div className="create-success-message_header">
                        <h3>Đăng bài viết thành công</h3>
                        <img src="../images/comunity_create_success.png" alt='ảnh lỗi' ></img>
                    </div>
                    <div className="create-success-message_body">
                        <p>
                            Bài viết của bạn sẽ được kiểm duyệt nội dung trước khi công khai.
                        </p>
                        <p>
                            Hãy đảm bảo các thông tin bài viết của bạn là chính xác!
                        </p>
                    </div>
                </div>
                <div className="create-success-btns">
                    <Button type="primary">
                        Bài viết HiJob
                    </Button>
                    <Button>
                        Xem bài viết của bạn
                    </Button>
                </div>
            </div>
            <RollTop />
            <Footer />
        </div >
    );
};

export default ComunityCreateSuccess;
