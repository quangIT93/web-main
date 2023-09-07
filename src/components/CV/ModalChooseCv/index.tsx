import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CopyCVIcon, EmailCVIcon, FaceCVIcon } from '#components/Icons';

import './style.scss';
import { getCookie } from 'cookies';

interface IModalShare {
    openModalChooseCv: boolean;
    setOpenModalChooseCv: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalChooseCv: React.FC<IModalShare> = (props) => {
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
    const { openModalChooseCv, setOpenModalChooseCv } = props;
    const [firstCv, setFirstCv] = useState<any>(false)

    useEffect(() => {
        const firt_cv = getCookie("firstCv");
        if (firt_cv && firt_cv === "1") {
            setFirstCv(true);
        }
    }, [])

    const handleCancel = () => {
        setOpenModalChooseCv(false);
    };

    return (
        <Modal
            width={614}
            centered
            title={
                <h3
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        // fontWeight: '700',
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'left',

                    }}>
                    {
                        languageRedux === 1 ?
                            "Chọn CV/Resume để xin việc" :
                            "Choose CV/Resume to apply for a job"
                    }
                </h3>
            }
            footer={null}
            open={openModalChooseCv}
            // onOk={handleOk}
            onCancel={handleCancel}
        >
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                }}
            >
                {
                    firstCv ?
                        languageRedux === 1 ?
                            "Bạn có muốn chọn CV / Resume đã hoàn thành của mình để xin việc, Tuyển dụng có thể tìm thấy bạn dễ dàng hơn?" :
                            "Do you want to choose your completed CV/Resume to apply for a job, Recruitments can find you more easily?"
                        :
                        languageRedux === 1 ?
                            "CV / Resume bạn vừa hoàn thành sẽ được chọn cho các đơn xin việc và Nhà tuyển dụng có thể tìm thấy bạn dễ dàng hơn!" :
                            "The CV/Resume you just completed will be selected for job applications and Employers can find you more easily!"
                }
            </p>
            <div className="share-buttons-choose-cv-modal">
                <Button type="primary" shape="round">Yes</Button>
                <Button type="text" shape="round"
                    style={{
                        display: firstCv ? "block" : "none"
                    }}
                    onClick={handleCancel}
                >
                    {
                        languageRedux === 1 ?
                            "Hủy" : "Cancel"
                    }
                </Button>
            </div>
        </Modal>
    );
};

export default ModalChooseCv;