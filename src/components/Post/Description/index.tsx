import React, { memo } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//@ts-ignore
import { styleLabel } from '#components/Post/CssPost';

import './style.scss';
interface IDescription {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
}

const Description: React.FC<IDescription> = (props) => {
  const { setDescription, description } = props;
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  return (
    <Box sx={{ marginTop: '24px' }} className="description-post">
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
        onChange={handleChangeDescription}
        sx={{ width: '100%', marginTop: '0.5rem' }}
        multiline
        rows={6}
        // label="Một số đặc điểm nhận diện công ty"
        placeholder="Một số đặc điểm nhận diện công ty:
    Tên công ty, địa chỉ, hình thức, mặt hàng kinh doanh
    Vị trí, yêu cầu công việc
    Mô tả yêu cầu kỹ năng, bằng cấp nếu có"
        value={description}
      />
    </Box>
  );
};

export default memo(Description);
