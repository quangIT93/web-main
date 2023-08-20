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
}

const EditRoleWebCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { setDataCompany, dataCompany } = props;

  const [dataRoles, setDataRoles] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [language, setLanguageState] = React.useState<any>();

  const getlanguageApi = async () => {
    try {
      const result = await languageApi.getLanguage(
        languageRedux === 1 ? "vi" : "en"
      );
      if (result) {
        setLanguageState(result.data);
        // setUser(result);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    getlanguageApi()
  }, [languageRedux])

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
        languageRedux === 1 ? "vi" : "en"
      );

      if (roles) {
        setDataRoles(roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

  const handleEditCompanyRole = (event: any, value: any) => {
    setSelectedRole(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyRoleInfomation: {
        id: value.id,
      },
    }));
  };

  const handleEditCompanyWeb = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      website: value,
    }));
  };

  return (
    <div className="edit-role-web-company-container">
      <div className="edit-role-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="addressTitle"
        >
          {
            language?.role_at_business
          }
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Autocomplete
          options={dataRoles ? dataRoles : []}
          getOptionLabel={(option: any) => option?.nameText || ''}
          value={selectedRole || null}
          onChange={handleEditCompanyRole}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={
                language?.company_page?.place_role
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
      </div>

      <div className="edit-web-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="jobTitle"
        >
          Website <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.website}
          onChange={handleEditCompanyWeb}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={
            language?.company_page?.place_web
          }
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
});

export default memo(EditRoleWebCompany);
