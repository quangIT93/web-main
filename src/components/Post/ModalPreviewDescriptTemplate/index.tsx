import React, { useEffect, useState } from 'react';
import { Button, Modal, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import apiDescriptTemplate from 'api/apiDescriptTemplate';

// import './style.scss';

interface IModalShare {
    openModalPreviewDescriptTemplate: boolean;
    setOpenModalPreviewDescriptTemplate: React.Dispatch<React.SetStateAction<boolean>>;
    templateId: number;
    //1: post, 2: company
    typeModal: number;
}

const ModalPreviewDescriptTemplate: React.FC<IModalShare> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const {
        openModalPreviewDescriptTemplate,
        setOpenModalPreviewDescriptTemplate,
        templateId,
        typeModal
    } = props;
    const [templateItem, setTemplateItem] = useState<any>({
        title: '',
        content: ''
    })
    const [isLoading, setIsLoading] = React.useState(false);
    const getDescriptTemplateById = async () => {
        try {
            setIsLoading(true);
            let result;
            typeModal === 1 ?
                result = await apiDescriptTemplate.getJobDescriptTemplateById(
                    templateId,
                    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
                )
                :
                result = await apiDescriptTemplate.getCompanyDescriptTemplateById(
                    templateId,
                    languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
                )
            if (result) {
                const item = {
                    title: result.data?.title,
                    content: result.data?.content,
                }
                setTemplateItem(item);
                setIsLoading(false);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDescriptTemplateById()
    }, [templateId])

    const handleCancel = () => {
        setOpenModalPreviewDescriptTemplate(false);
    };

    return (
        <Modal
            width={800}
            zIndex={2000}
            centered
            title={
                <Skeleton loading={isLoading} active >
                    <h3
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '24px',
                            // fontWeight: '700',
                            lineHeight: '24px',
                            letterSpacing: '0em',
                            textAlign: 'center',
                        }}
                    >
                        {templateItem.title}
                    </h3>
                </Skeleton>
            }
            footer={null}
            open={openModalPreviewDescriptTemplate}
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
                    whiteSpace: 'pre-wrap',
                    maxHeight: '400px',
                    overflowY: 'scroll',
                    paddingRight: '10px',
                }}
            >
                <Skeleton loading={isLoading} active >
                    {templateItem.content}
                </Skeleton>
            </p>
            {/* <div className="buttons-over-10-cv-modal">
        <Button
          type="primary"
          shape="round"
          onClick={async () => {
            window.open('/profile-cv', '_parent');
          }}
        >
          {languageRedux === 1
            ? 'Trang quảng lý CV'
            : languageRedux === 2
              ? 'CV Management page'
              : languageRedux === 3 && 'CV 관리 페이지'}
        </Button>
        <Button
          type="text"
          shape="round"
          //   style={{
          //     display: firstCv ? 'block' : 'none',
          //   }}
          onClick={handleCancel}
        >
          {languageRedux === 1
            ? 'Hủy'
            : languageRedux === 2
              ? 'Cancel'
              : languageRedux === 3 && '취소'}
        </Button>
      </div> */}
        </Modal>
    );
};

export default ModalPreviewDescriptTemplate;
