import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';
import languageApi from 'api/languageApi';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
  fontSize: 14,
};

interface IEditDescripeCompany {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditDescripeCompany: React.FC<IEditDescripeCompany> = (props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    dataCompany,
    setDataCompany,
    is_profile,
    setUnsavedChanges,
    setIsValid,
  } = props;
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi();
  // }, [languageRedux]);

  const handleEditCompanyDes = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setUnsavedChanges(true);
    setDataCompany((preValue: any) => ({
      ...preValue,
      description: value,
    }));
    setIsValid(false);
  };

  return (
    <div className="edit-des-company-container modal-person editCompany">
      <div className="edit-des-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {languageRedux === 1
            ? 'Mô tả công ty'
            : languageRedux === 2
              ? "Company's description"
              : '회사소개'}{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          disabled={is_profile ? true : false}
          type="text"
          id="company_place_des"
          multiline
          rows={12}
          name="title"
          value={dataCompany?.description}
          onChange={handleEditCompanyDes}
          sx={{ width: '100%', marginTop: '8px', fontSize: '14px' }}
          placeholder={
            languageRedux === 1
              ? 'Mô tả công ty'
              : languageRedux === 2
                ? "Company's description"
                : '회사소개'
          }
          //   error={titleError} // Đánh dấu lỗi
        />
        <div className="wrap-noti_input">
          {dataCompany?.description?.length === 0 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Thông tin thêm không được bỏ trống'
                : languageRedux === 2
                  ? 'Additional information cannot be empty'
                  : languageRedux === 3 && '추가 정보는 비워둘 수 없습니다.'}
            </span>
          ) : dataCompany?.description?.length > 1000 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Thông tin thêm không được vượt quá 1000 ký tự'
                : languageRedux === 2
                  ? 'Additional information cannot exceed 1000 characters'
                  : languageRedux === 3 &&
                    '추가 정보는 1000자를 초과할 수 없습니다.'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${dataCompany?.description?.length}/1000`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(EditDescripeCompany);
