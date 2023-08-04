import React from 'react';
// import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// import { Button } from 'antd';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

import {
  CompanyNameDetailPostIcon,
  ClockDetailPostIcon,
} from '#components/Icons';

import historyRecruiter from 'api/historyRecruiter';
// import applitedPostedApi from 'api/apiAppliedPosted';
import postApi from 'api/postApi';

import './style.scss';
import { Button } from 'antd';

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
};

interface IModalFillDataPost {
  openModalFillDataPost: boolean;
  setOpenFillDataPost: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleJob: React.Dispatch<React.SetStateAction<string>>;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  setFillWardId: React.Dispatch<React.SetStateAction<any>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setFillDistrict: React.Dispatch<React.SetStateAction<any>>;
  setFillProvince: React.Dispatch<React.SetStateAction<any>>;
  setTypeJob: React.Dispatch<React.SetStateAction<number>>;
  setIsPeriodDate: React.Dispatch<React.SetStateAction<number>>;
  setStartDate: React.Dispatch<React.SetStateAction<any>>;
  setEndDate: React.Dispatch<React.SetStateAction<any>>;
  setIsWorkingWeekend: React.Dispatch<React.SetStateAction<any>>;
  setIsRemotely: React.Dispatch<React.SetStateAction<any>>;
  setStartTime: React.Dispatch<React.SetStateAction<any>>;
  setEndTime: React.Dispatch<React.SetStateAction<any>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<any>>;
  setSalaryMax: React.Dispatch<React.SetStateAction<any>>;
  setSalaryMin: React.Dispatch<React.SetStateAction<any>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setWardId: React.Dispatch<React.SetStateAction<string>>;
  setCategoriesId: React.Dispatch<React.SetStateAction<string[]>>;
  setFillCate: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFillImages: React.Dispatch<React.SetStateAction<string[]>>;
  setSalaryType: React.Dispatch<React.SetStateAction<number>>;
  setMoneyType: React.Dispatch<React.SetStateAction<number>>;
}
const ModalFillDataPost: React.FC<IModalFillDataPost> = (props) => {
  const {
    openModalFillDataPost,
    setOpenFillDataPost,
    setTitleJob,
    setCompanyName,
    setFillWardId,
    setAddress,
    setFillProvince,
    setFillDistrict,
    setTypeJob,
    setIsPeriodDate,
    setStartDate,
    setEndDate,
    setIsWorkingWeekend,
    setIsRemotely,
    setStartTime,
    setEndTime,
    setPhoneNumber,
    setSalaryMin,
    setSalaryMax,
    setDescription,
    setWardId,
    setCategoriesId,
    setFillCate,
    setSelectedImages,
    setSelectedFillImages,
    setSalaryType,
    setMoneyType,
  } = props;

  const [dataPost, setDataPost] = React.useState<any>([]);
  const handleClose = () => {
    setOpenFillDataPost(false);
    setTitleJob('');
    setCompanyName('');
    setFillWardId('');
    setWardId('');
    setAddress('');
    setFillProvince({});
    setFillDistrict({});
    setIsPeriodDate(0);
    setStartDate(null);
    setEndDate(null);
    setIsWorkingWeekend(0);
    setIsRemotely(0);
    setStartTime(0);
    setEndTime(0);
    setPhoneNumber(null);
    setSalaryMax(12000000);
    setSalaryMin(0);
    setDescription('Chưa cập nhật');
    setSelectedValue(-1);
    setSelectedImages([]);
    setSelectedFillImages([]);
    setCategoriesId([]);
    setFillCate([]);
    setSalaryType(1);
    setMoneyType(1);
  };

  const allPost = async () => {
    try {
      // const result = await applitedPostedApi.getAllApplitedPostedApi(0);
      const result = await historyRecruiter.getAllPosted(0, 20, null);
      if (result) {
        setDataPost(result.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    allPost();
  }, []);

  const [selectedValue, setSelectedValue] = React.useState<number>(0);

  const handleRadioChange = async (e: any, itemPost: any) => {
    // console.log('value', typeof event.target.value);
    setSelectedValue(parseInt(e?.target?.value));
    setTitleJob(itemPost.title);
    setCompanyName(itemPost.company_name);
    setFillWardId({ id: itemPost.ward_id, full_name: itemPost.ward });
    setWardId(itemPost.ward_id);

    setFillProvince({
      id: itemPost.province_id,
      name: itemPost.province,
    });
    setFillDistrict({
      id: itemPost.district_id,
      full_name: itemPost.district,
    });
    setTypeJob(itemPost.job_type.job_type_id);
    // console.log('itemPost', itemPost);

    try {
      const result = await postApi.getById(itemPost.post_id);
      // console.log('reuslt', result.data);
      if (result) {
        setTypeJob(result.data.job_type.job_type_id);
        setIsPeriodDate(result.data.is_date_period);
        setStartDate(result.data.start_date);
        setEndDate(result.data.end_date);
        setIsWorkingWeekend(result.data.is_working_weekend);
        setIsRemotely(result.data.is_remotely);
        setStartTime(result.data.start_time);
        setEndTime(result.data.end_time);
        setPhoneNumber(`0` + result.data.phone_contact.slice(3));
        setSalaryMax(result.data.salary_max);
        setSalaryMin(result.data.salary_min);
        setDescription(result.data.description);
        setAddress(result.data.address);
        setCategoriesId(
          result.data.categories.map((cate: any) => cate.child_category_id),
        );
        setFillCate(
          result.data.categories.map((cate: any) => [
            cate.parent_category_id,
            cate.child_category_id,
          ]),
        );

        setSelectedImages(result.data.images.map((image: any) => image.image));
        setSelectedFillImages(
          result.data.images.map((image: any) => image.image),
        );
        setSalaryType(result.data.salary_type_id);
        setMoneyType(result.data.money_type);
      }
    } catch (error) {}
  };

  const handleSubmitValueFill = () => {
    setOpenFillDataPost(false);
    // setSelectedValue(-1);
  };

  const handleCancleFillData = () => {
    setOpenFillDataPost(false);
    setTitleJob('');
    setCompanyName('');
    setFillWardId('');
    setAddress('');
    setFillProvince({});
    setFillDistrict({});
    setIsPeriodDate(0);
    setStartDate(null);
    setEndDate(null);
    setIsWorkingWeekend(0);
    setIsRemotely(0);
    setStartTime(0);
    setEndTime(0);
    setPhoneNumber(null);
    setSalaryMax(12000000);
    setSalaryMin(0);
    setDescription('Chưa cập nhật');
    setSelectedValue(-1);
    setSelectedImages([]);
    setSelectedFillImages([]);
    setCategoriesId([]);
    setFillCate([]);
    setSalaryType(1);
    setMoneyType(1);
  };

  return (
    <div>
      <Modal
        open={openModalFillDataPost}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box-modal_filterOld">
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
            HiJob sẽ tự động điền tất cả các thông tin công việc trước đó của
            bạn!
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
            Bài tuyển dụng mà bạn muốn HiJob lấy thông tin tự động
          </p>
          <div className="post_items_old">
            {dataPost ? (
              dataPost?.map((itemPost: any, index: number) => (
                <div key={index} className="post_item_old">
                  <h3>
                    {index + 1}. {itemPost.title}
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
              Yes
            </Button>
            <Button block onClick={handleCancleFillData}>
              No
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

export default ModalFillDataPost;
