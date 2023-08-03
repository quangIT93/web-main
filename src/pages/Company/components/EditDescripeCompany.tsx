import React, { memo } from 'react';
// import component UI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditDescripeCompany {
  setDataCompany: any;
  dataCompany: any;
}

const EditDescripeCompany: React.FC<IEditDescripeCompany> = (props) => {
  const { dataCompany, setDataCompany } = props;

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
          Mô tả công ty <span style={{ color: 'red' }}>*</span>
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
          placeholder="Nhập vào nội dung"
        //   error={titleError} // Đánh dấu lỗi
        />
      </div>
    </div>
  );
};

export default memo(EditDescripeCompany);
