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
};

interface IEditDescripeCompany {
  setDataCompany: any;
  dataCompany: any;
}

const EditDescripeCompany: React.FC<IEditDescripeCompany> = (props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { dataCompany, setDataCompany } = props;
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

  const handleEditCompanyDes = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setDataCompany((preValue: any) => ({
      ...preValue,
      description: value,
    }));
  };

  return (
    <div className="edit-des-company-container">
      <div className="edit-des-company">
        <Typography
          sx={styleLabel}
          variant="body1"
          component="label"
          htmlFor="editCompany"
        >
          {
            language?.company_décription
          }{' '}
          <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField
          type="text"
          id="editCompany"
          multiline
          rows={12}
          name="title"
          value={dataCompany?.description}
          onChange={handleEditCompanyDes}
          sx={{ width: '100%', marginTop: '8px' }}
          placeholder={
            language?.company_page?.place_des
          }
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
};

export default memo(EditDescripeCompany);
