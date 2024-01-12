import React, { useState, useEffect, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
// import locationApi from '../../../api/locationApi';

import apiCompany from 'api/apiCompany';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';
import languageApi from 'api/languageApi';

// import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  setFillRole: React.Dispatch<React.SetStateAction<any>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditRoleWebCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const {
    setDataCompany,
    dataCompany,
    is_profile,
    setUnsavedChanges,
    setFillRole,
    setIsValid,
  } = props;
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [dataRoles, setDataRoles] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
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
  //   getlanguageApi()
  // }, [languageRedux])

  const validURL = (str: string) => {
    if (str?.length < 50) {
      // var pattern = new RegExp(
      //   '^(https?:\\/\\/)?' + // protocol
      //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      //     '(\\#[-a-z\\d_]*)?$',
      //   'i',
      // ); // fragment locator
      var pattern = new RegExp(
        /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
      ); // fragment locator

      return !!pattern.test(str);
    }
  };
  useEffect(() => {
    if (dataRoles && !selectedRole) {
      setSelectedRole(
        dataRoles?.find(
          (dataRole: any) =>
            dataRole?.nameText === dataCompany?.companyRoleInfomation?.nameText,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoles]);

  const getRoles = async () => {
    try {
      const roles = await apiCompany.getAllRolesCompany(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (roles) {
        setDataRoles(roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (is_profile === false) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleEditCompanyRole = (event: any, value: any) => {
    setSelectedRole(value);
    setUnsavedChanges(true);
    setFillRole(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyRoleInfomation: {
        id: value ? value.id : '',
      },
    }));
    setIsValid(false);
  };

  const handleEditCompanyWeb = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setUnsavedChanges(true);
    setDataCompany((preValue: any) => ({
      ...preValue,
      website: value,
    }));
    setIsValid(false);
  };

  return (
    <div className="edit-role-web-company-container modal-person editCompany">
      <div className="edit-role-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {languageRedux === 1
            ? 'Vai trò của bạn trong công ty'
            : languageRedux === 2
            ? 'Your role in the company'
            : '회사에서 귀하의 역할'}{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Autocomplete
          disabled={is_profile ? true : false}
          options={dataRoles ? dataRoles : []}
          getOptionLabel={(option: any) => option?.nameText || ''}
          value={selectedRole || null}
          onChange={handleEditCompanyRole}
          id="company_place_role"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                languageRedux === 1
                  ? 'Vai trò của bạn trong công ty'
                  : languageRedux === 2
                  ? 'Your role in the company'
                  : '회사에서 귀하의 역할'
              }
              size="small"
              // value={dataCompany?.companyRole?.name}
            />
          )}
          isOptionEqualToValue={(option, value) => {
            return option.nameText === value.nameText;
          }}
          style={{ marginTop: '8px' }}
        />
        <div className="wrap-noti_input">
          {!selectedRole ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Email không được bỏ trống'
                : languageRedux === 2
                ? 'Email cannot be empty'
                : languageRedux === 3 && '이메일이 비어 있지 않습니다'}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="edit-web-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          {languageRedux === 1
            ? 'Trang web'
            : languageRedux === 2
            ? 'Website'
            : '웹사이트'}{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="company_website"
          name="title"
          value={dataCompany?.website}
          onChange={handleEditCompanyWeb}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder="https://example.com"
          disabled={is_profile ? true : false}
          //   error={titleError} // Đánh dấu lỗi
        />
        <div className="wrap-noti_input">
          {dataCompany?.website?.length > 100 ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Link web không được vượt quá 100 ký tự'
                : languageRedux === 2
                ? 'Web link cannot exceed 100 characters'
                : languageRedux === 3 &&
                  '웹 링크는 100자를 초과할 수 없습니다.'}
            </span>
          ) : validURL(dataCompany?.website) === false ? (
            <span className="helper-text">
              {languageRedux === 1
                ? 'Link web không đúng định dạng'
                : languageRedux === 2
                ? 'Web link is not in the correct format'
                : languageRedux === 3 && '웹 링크의 형식이 올바르지 않습니다.'}
            </span>
          ) : (
            <></>
          )}
          <span className="number-text">{`${dataCompany?.website?.length}/100`}</span>
        </div>
      </div>
    </div>
  );
});

export default memo(EditRoleWebCompany);
