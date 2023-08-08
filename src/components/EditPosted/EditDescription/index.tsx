import React, { memo } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//@ts-ignore
import { styleLabel } from '../CssEditPost';

interface IEditDescription {
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>;
  editDataPosted: any;
}

const EditDescription: React.FC<IEditDescription> = (props) => {
  const { setEditDataPosted, editDataPosted } = props;

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      description: e.target.value,
    }));
  };
  return (
    <Box sx={{ marginTop: '24px' }}>
      <Typography
        sx={styleLabel}
        variant="body1"
        component="label"
        htmlFor="startTime"
      >
        Mô tả công việc <span style={{ color: 'red' }}>*</span>
      </Typography>
      <TextField
        // className={classes.textarea}
        value={editDataPosted?.description}
        onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '4px' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder="Một số đặc điểm nhận diện công ty:
Tên công ty, địa chỉ, hình thức, mặt hàng kinh doanh
Vị trí, yêu cầu công việc
Mô tả yêu cầu kỹ năng, bằng cấp nếu có"
      />
    </Box>
  );
};

export default memo(EditDescription);
