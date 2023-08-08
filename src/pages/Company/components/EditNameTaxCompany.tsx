import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditNameFaxCompany {
  setDataCompany: any;
  dataCompany: any;
}

const EditNameFaxCompany: React.FC<IEditNameFaxCompany> = (props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { dataCompany, setDataCompany } = props;

  const handleEditCompanyFax = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      taxCode: value,
    }));
  };

  const handleEditCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      name: value,
    }));
  };

  return (
    <div className="edit-name-tax-company-container">
      <div className="edit-name-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {
            languageRedux === 1 ?
              company.company_name :
              companyEn.company_name
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editCompany"
          name="title"
          value={dataCompany?.name}
          onChange={handleEditCompanyName}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={
            languageRedux === 1 ?
              company.place_name :
              companyEn.place_name
          }
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
      <div className="edit-tax-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editJob"
        >
          {
            languageRedux === 1 ?
              company.tax_code :
              companyEn.tax_code
          }
        </Typography>
        <TextField
          type="text"
          id="editJob"
          name="title"
          value={dataCompany?.taxCode}
          onChange={handleEditCompanyFax}
          size="small"
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={
            languageRedux === 1 ?
              company.place_tax :
              companyEn.place_tax
          }
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
};

export default memo(EditNameFaxCompany);
