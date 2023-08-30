import * as React from 'react';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';

import './style.scss';


import { Modal, Button, Avatar } from 'antd';

const TemplatesCv: React.FC = () => {

    return (
        <div className="cv-container">
            <Navbar />
            <div className="cv-content">
                {/* <div className="cv-content-page">
                    <div className="page" id="divToPrint1">
                        <div className="subpage">
                            <CV1 />
                        </div>
                    </div>
                </div>
                <div className="cv-content-page">
                    <div className="page" id="divToPrint2">
                        <div className="subpage">
                            <CV1 />
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        printDocument(true);
                    }}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                >
                    Download
                </Button>
                <Button
                    onClick={() => {
                        printDocument(false);
                    }}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                >
                    Preview
                </Button> */}
            </div>
            <Footer />
            {/* <Modal
                title="Basic Modal"
                open={open}
                //   onOk={this.handleOk}
                onCancel={handleOpenModel}
            >
                <Avatar size={200} src={blobCv} />
            </Modal> */}
        </div>
    );
};

export default TemplatesCv;
