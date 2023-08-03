import React, { useState, useEffect, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
// import locationApi from '../../../api/locationApi';

import apiCompany from 'api/apiCompany';

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
  const { setDataCompany, dataCompany } = props;

  const [dataRoles, setDataRoles] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);

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
      const roles = await apiCompany.getAllRolesCompany();

      if (roles) {
        setDataRoles(roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

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
          Vai trò của bạn trong doanh nghiệp{' '}
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
              placeholder="Chọn vai trò của bạn"
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
          placeholder="http://"
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
});

export default memo(EditRoleWebCompany);
