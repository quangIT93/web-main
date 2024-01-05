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
import { Button, Empty, Input, Skeleton, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';
import apiDescriptTemplate from 'api/apiDescriptTemplate';
import FilterCategoryTemplate from './FilterCategoryTemplate';
import NoDataComponent from 'utils/NoDataPage';

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
  setOpenModalFillDescriptTemplate: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setOpenModalPreviewDescriptTemplate: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setDescription: React.Dispatch<React.SetStateAction<any>>;
  //1: post, 2: company
  typeModal: number;
  oldDescription: any;
  setTemplateId: React.Dispatch<React.SetStateAction<number>>;
}
const ModalFillDescriptTemplate: React.FC<IModalFillDataPost> = (props) => {
  const {
    openModalFillDescriptTemplate,
    setOpenModalFillDescriptTemplate,
    setOpenModalPreviewDescriptTemplate,
    setDescription,
    typeModal,
    oldDescription,
    setTemplateId,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [descriptTemplate, setDescriptTemplate] = React.useState<any>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState<any>('0');
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<any>([]);
  const [reset, setReset] = React.useState<boolean>(false);
  const [keyUp, setKeyUp] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const handleClose = () => {
    setOpenModalFillDescriptTemplate(false);
  };

  const allDescriptTemplate = async () => {
    try {
      setIsLoading(true);
      let result;
      typeModal === 1
        ? (result = await apiDescriptTemplate.getJobDescriptTemplate(
            10,
            0,
            categories[1] !== null ? categories[1] : null,
            title !== '' ? title : null,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          ))
        : (result = await apiDescriptTemplate.getCompanyDescriptTemplate(
            10,
            0,
            categories[0] !== null ? categories[0] : null,
            title !== '' ? title : null,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          ));
      setHasMore(true);
      if (result.data.data.length === 10) {
        setDescriptTemplate(result.data.data);
        setIsLoading(false);
      } else if (result.data.data.length < 10) {
        setDescriptTemplate(result.data.data);
        setIsLoading(false);
        setHasMore(false);
      } else {
        setDescriptTemplate(result.data.data);
        setIsLoading(false);
        setHasMore(false);
        setPage('0');
        return;
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log('categories', categories[1]);

  const fetchMoreData = async () => {
    setHasMore(true);
    try {
      // const nextPage = (parseInt(page) + 1).toString();
      // const nextPage = descriptTemplate[descriptTemplate.length - 1].id
      const nextPage = parseInt(page) + 1;

      let result: any;
      typeModal === 1
        ? (result = await apiDescriptTemplate.getJobDescriptTemplate(
            10,
            nextPage,
            categories[1] !== null ? categories[1] : null,
            title !== '' ? title : null,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          ))
        : (result = await apiDescriptTemplate.getCompanyDescriptTemplate(
            10,
            nextPage,
            categories[0] !== null ? categories[0] : null,
            title !== '' ? title : null,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          ));
      if (result && result.data.data.length >= 10) {
        setPage(nextPage);
        setDescriptTemplate((prev: any) => [...prev, ...result?.data.data]);
      } else if (result && result.data.data.length < 10) {
        setDescriptTemplate((prev: any) => [...prev, ...result?.data.data]);
        setHasMore(false);
        setPage('0');
      } else {
        setHasMore(false);
        setPage('0');
      }
    } catch (error) {
      setHasMore(false);
      setPage('0');
    }
  };

  React.useEffect(() => {
    openModalFillDescriptTemplate && allDescriptTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux, openModalFillDescriptTemplate, categories, keyUp]);

  const [selectedValue, setSelectedValue] = React.useState<number>(0);

  const handleRadioChange = async (e: any, itemPost: any) => {
    setSelectedValue(parseInt(e?.target?.value));

    typeModal === 1
      ? setDescription(itemPost.content)
      : setDescription((preValue: any) => ({
          ...preValue,
          description: itemPost.content,
        }));
  };

  const handleSubmitValueFill = () => {
    setOpenModalFillDescriptTemplate(false);
    // setSelectedValue(-1);
  };
  const handleCancleFillData = () => {
    setOpenModalFillDescriptTemplate(false);
    // console.log(oldDescription);
    typeModal === 1
      ? setDescription(oldDescription)
      : setDescription((preValue: any) => ({
          ...preValue,
          description: oldDescription,
        }));
    setSelectedValue(-1);
  };

  const debounce = (func: any, timeout = 1000) => {
    // Declare a variable called 'timer' to store the timer ID
    let timer: any;
    // Return an anonymous function that takes in any number of arguments
    return (...args: any) => {
      // Clear the previous timer to prevent the execution of 'mainFunction'
      clearTimeout(timer);
      // Set a new timer that will execute 'mainFunction' after the specified delay
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  const saveInput = () => {
    // console.log('Saving data');
    setKeyUp(!keyUp);
  };
  const processChange = debounce(() => saveInput());

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
              ? `HiJob sẽ tự động điền mẫu mô tả ${
                  typeModal === 1 ? 'công việc' : 'công ty'
                } theo thông tin ${
                  typeModal === 1 ? 'bài đăng' : 'công ty'
                } của bạn!`
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
          <div className="wrap-cate-title-filter-template">
            <FilterCategoryTemplate
              setCategories={setCategories}
              setReset={setReset}
              reset={reset}
              categories={categories}
              typeModal={typeModal}
            />
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyUp={processChange}
              placeholder={
                languageRedux === 1
                  ? 'Nhập tiêu đề mẫu mô tả bạn muốn tìm'
                  : languageRedux === 2
                  ? 'Enter template title that you want to looking for'
                  : '원하시는 설명 템플릿 제목을 입력하세요'
              }
            />
          </div>
          <div className="template_list" id="template_list_scrollable">
            {descriptTemplate.length > 0 ? (
              <InfiniteScroll
                dataLength={descriptTemplate?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spin style={{ width: '100%' }} indicator={antIcon} />}
                style={{ overflow: 'unset' }}
                scrollableTarget="template_list_scrollable"
              >
                {descriptTemplate &&
                  descriptTemplate.map((itemPost: any, index: number) => (
                    <Skeleton loading={isLoading} active key={index}>
                      <div key={index} className="template_item">
                        <h3>
                          {index + 1}. {itemPost?.title}
                        </h3>
                        <ul className="template_description">
                          <li>
                            <p>{itemPost?.content}</p>
                          </li>
                          <li>
                            <p
                              style={{
                                cursor: 'pointer',
                                color: '#0D99FF',
                              }}
                              onClick={() => {
                                setOpenModalPreviewDescriptTemplate(true);
                                setTemplateId(itemPost?.id);
                              }}
                            >
                              {languageRedux === 1
                                ? 'Xem chi tiết'
                                : languageRedux === 2
                                ? 'View details'
                                : languageRedux === 3
                                ? '자세히 보기 '
                                : 'Xem chi tiết'}
                            </p>
                          </li>
                        </ul>

                        <input
                          type="radio"
                          // id={`option-${option.id}`}
                          name="options"
                          value={itemPost?.id}
                          checked={
                            selectedValue === itemPost?.id ? true : false
                          }
                          onChange={(e) => handleRadioChange(e, itemPost)}
                          defaultValue={undefined}
                        />
                      </div>
                    </Skeleton>
                  ))}
              </InfiniteScroll>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  languageRedux === 1
                    ? 'Không có thông tin hiển thị!'
                    : languageRedux === 2
                    ? 'No display information!'
                    : languageRedux === 3 && '표시되는 정보가 없습니다!'
                }
              />
            )}
          </div>

          <div className="wrap-button_filterTemplate">
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
