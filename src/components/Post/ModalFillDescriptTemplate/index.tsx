import React from 'react';
// import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    CompanyNameDetailPostIcon,
    ClockDetailPostIcon,
} from '#components/Icons';

import historyRecruiter from 'api/historyRecruiter';
// import applitedPostedApi from 'api/apiAppliedPosted';
import postApi from 'api/postApi';

import './style.scss';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    // boxShadow: 24,
    outline: 'none',
    borderRadius: '10px',
    p: 4,
    '@media (max-width: 399px)': {
        width: 360,
    },
    '@media (max-width: 375px)': {
        width: 300,
    },

    '@media (min-width: 400px) and (max-width: 640px)': {
        width: 410,
    },
};

interface IModalFillDataPost {
    openModalFillDescriptTemplate: boolean;
    setOpenModalFillDescriptTemplate: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalPreviewDescriptTemplate: React.Dispatch<React.SetStateAction<boolean>>;
    setDescription: React.Dispatch<React.SetStateAction<any>>;
    //1: post, 2: company
    typeModal: number;
    oldDescription: any;
}
const ModalFillDescriptTemplate: React.FC<IModalFillDataPost> = (props) => {
    const {
        openModalFillDescriptTemplate,
        setOpenModalFillDescriptTemplate,
        setOpenModalPreviewDescriptTemplate,
        setDescription,
        typeModal,
        oldDescription,
    } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)

    const [dataPost, setDataPost] = React.useState<any>([]);

    const handleClose = () => {
        setOpenModalFillDescriptTemplate(false);
    };

    const allPost = async () => {
        try {
            // const result = await applitedPostedApi.getAllApplitedPostedApi(0);
            const result = await historyRecruiter.getAllPosted(
                0,
                20,
                null,
                languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            );
            if (result) {
                setDataPost(result.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    React.useEffect(() => {
        allPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [languageRedux]);

    const [selectedValue, setSelectedValue] = React.useState<number>(0);

    const handleRadioChange = async (e: any, itemPost: any) => {
        setSelectedValue(parseInt(e?.target?.value));

        try {
            const result = await postApi.getById(
                itemPost.post_id,
                languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
            );
            if (result) {
                console.log('reuslt', result.data.description);
                typeModal === 1 ?
                    setDescription(result.data.description) :
                    setDescription((preValue: any) => ({
                        ...preValue,
                        description: result.data.description,
                    }));
            }
        } catch (error) { }
    };

    const handleSubmitValueFill = () => {
        setOpenModalFillDescriptTemplate(false);
        // setSelectedValue(-1);
    };
    const handleCancleFillData = () => {
        setOpenModalFillDescriptTemplate(false);
        console.log(oldDescription);
        typeModal === 1 ?
            setDescription(oldDescription) :
            setDescription((preValue: any) => ({
                ...preValue,
                description: oldDescription,
            }));
        setSelectedValue(-1)
    };

    return (
        <div>
            <Modal
                open={openModalFillDescriptTemplate}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="box-modal_filterTemplate">
                    <Typography
                        id="modal-title"
                        variant="h5"
                        component="h5"
                        sx={{
                            textAlign: 'center',
                            color: '#000000',
                            position: 'relative',
                            fontSize: '20px',
                            fontWeight: '600',
                        }}
                    >
                        {languageRedux === 1
                            ? `HiJob sẽ tự động điền mẫu mổ tả ${typeModal === 1 ? 'công việc' : 'công ty'
                            } theo thông tin bài post của bạn!`
                            : languageRedux === 2
                                ? 'HiJob will automatically fill all your previous job information!'
                                : languageRedux === 3 &&
                                'HiJob이 자동으로 귀하의 이전 직업 정보를 전부 채워드립니다!'}
                        {/* <IconButton
              aria-label="close"
              sx={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <CloseIcon />
            </IconButton> */}
                    </Typography>
                    <p
                        style={{
                            textAlign: 'center',
                            margin: '24px 0',
                            fontSize: '16px',
                        }}
                    >
                        {languageRedux === 1
                            ? 'Mẫu mô tả mà bạn muốn HiJob lấy thông tin tự động'
                            : languageRedux === 2
                                ? 'Select job post that you want HiJob to get information automatically'
                                : languageRedux === 3 &&
                                'HiJob이 자동으로 정보를 검색하도록 하려는 채용 게시물'}
                    </p>
                    <div className="post_items_old">
                        {dataPost ? (
                            dataPost?.map((itemPost: any, index: number) => (
                                <div key={index} className="post_item_old">
                                    <h3>
                                        {index + 1}. {itemPost.title}
                                        <span style={{
                                            cursor: 'pointer',
                                            color: '#0D99FF'
                                        }}
                                            onClick={() => {
                                                setOpenModalPreviewDescriptTemplate(true);
                                            }}
                                        >
                                            Preview
                                        </span>
                                    </h3>
                                    <ul className="wrap-items_postOld">
                                        <li>
                                            <CompanyNameDetailPostIcon />
                                            <span>{itemPost.company_name}</span>
                                        </li>
                                        <li>
                                            <ClockDetailPostIcon />
                                            <span>
                                                {moment(new Date(itemPost.created_at)).format('HH:mm')}
                                                <span>&nbsp;</span>
                                                {new Date(itemPost.created_at).toLocaleDateString(
                                                    'en-GB',
                                                )}
                                            </span>
                                        </li>
                                    </ul>

                                    <input
                                        type="radio"
                                        // id={`option-${option.id}`}
                                        name="options"
                                        value={itemPost?.post_id}
                                        checked={selectedValue === itemPost?.post_id ? true : false}
                                        onChange={(e) => handleRadioChange(e, itemPost)}
                                        defaultValue={undefined}
                                    />
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="wrap-button_filterPost">
                        <Button type="primary" block onClick={handleSubmitValueFill}>
                            {languageRedux === 1
                                ? 'Xác nhận'
                                : languageRedux === 2
                                    ? 'Ok'
                                    : languageRedux === 3 && '확인'}
                        </Button>
                        <Button block onClick={handleCancleFillData}>
                            {languageRedux === 1
                                ? 'Hủy'
                                : languageRedux === 2
                                    ? 'Cancel'
                                    : languageRedux === 3 && '취소'}
                        </Button>
                    </div>

                    {/* <h4
        style={{ color: '#0d99ff ', textAlign: 'center', margin: '12px' }}
      >
        TẢI ỨNG DỤNG HIJOB
      </h4> */}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalFillDescriptTemplate;
