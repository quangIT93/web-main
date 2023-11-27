import React, { memo } from 'react';

import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import { RootState } from '../../../store/reducer';
import { useSelector } from 'react-redux';
// import FormValues from '../../../pages/Post/index';

interface PropsPostCompanyJob {
  setTitleJob: React.Dispatch<React.SetStateAction<any>>;
  setCompanyName: React.Dispatch<React.SetStateAction<any>>;
  // titleError: boolean;
  // companyError: boolean;
  titleJob: string;
  companyName: string;
  language: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostJobCompany: React.FC<PropsPostCompanyJob> = (props) => {
  const {
    setTitleJob,
    setCompanyName,
    // titleError,
    // companyError,
    titleJob,
    companyName,
    language,
    setIsValidSubmit,
  } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const handleChangeTitleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleJob(e.target.value);
    setIsValidSubmit(false);
  };

  const handleChangeCompanyForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
    setIsValidSubmit(false);
  };

  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  };

  return (
    <div className="post-jobCompany modal-person">
      <div className="post-titleJob post-title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          {
            languageRedux === 1
              ? 'Tên công việc'
              : languageRedux === 2
                ? 'Job Title'
                : languageRedux === 3
                  ? '직업 이름을'
                  : 'Tên công việc'
          } <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="post_jobTitle_job_title"
          name="title"
          //   value={formValues.title}
          onChange={handleChangeTitleForm}
          size="small"
          sx={{ width: '100%', marginTop: '0.5rem' }}
          placeholder={
            languageRedux === 1
              ? 'Tên công việc'
              : languageRedux === 2
                ? 'Job Title'
                : languageRedux === 3
                  ? '직업 이름을'
                  : 'Tên công việc'
          }
          // error={titleError} // Đánh dấu lỗi
          value={titleJob ? titleJob : ''}
        />
        <div className="wrap-noti_input">
          {titleJob && titleJob.length > 255 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Tiêu đề công việc không được vượt quá 255 ký tự'
                : languageRedux === 2
                  ? 'Job Title cannot exceed 255 characters'
                  : languageRedux === 3 && '직위는 255자를 초과할 수 없습니다.'}
            </span>
          ) : !titleJob ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Tiêu đề công việc không được bỏ trống'
                : languageRedux === 2
                  ? 'Job title cannot be empty'
                  : languageRedux === 3 && '직함은 비워 둘 수 없습니다.'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${titleJob ? titleJob.length : '0'
            }/255`}</span>
        </div>
      </div>
      <div className="post-titleCompany post-title">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="company"
        >
          {
            languageRedux === 1
              ? 'Tên công ty'
              : languageRedux === 2
                ? "Company's name"
                : languageRedux === 3
                  ? '회사명을'
                  : 'Tên công ty'
          } <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="post_job_company"
          name="company_name"
          // value={formValues.company_name}
          size="small"
          onChange={handleChangeCompanyForm}
          sx={{ width: '100%', marginTop: '0.5rem' }}
          placeholder={
            languageRedux === 1
              ? 'Tên công ty'
              : languageRedux === 2
                ? "Company's name"
                : languageRedux === 3
                  ? '회사명을'
                  : 'Tên công ty'
          }
          // error={companyError} // Đánh dấu lỗi
          value={companyName}
        />
        <div className="wrap-noti_input">
          {companyName && companyName.length > 255 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Tên công ty không được vượt quá 255 ký tự'
                : languageRedux === 2
                  ? 'Company Name cannot exceed 255 characters'
                  : languageRedux === 3 &&
                  '회사 이름은 255자를 초과할 수 없습니다.'}
            </span>
          ) : !companyName ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Tên công ty không được bỏ trống'
                : languageRedux === 2
                  ? 'Company Name cannot be empty'
                  : languageRedux === 3 && '회사 이름은 비워 둘 수 없습니다.'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${companyName ? companyName.length : '0'
            }/255`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(PostJobCompany);
