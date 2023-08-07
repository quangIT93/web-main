import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
// import { AxiosResponse } from 'axios';
import categoriesApi from '../../../api/categoriesApi';

import './style.scss';

interface Option {
  id: string;
  name: string;
  image: string;
  default_post_image: string;
}

interface IPostCategoryIds {
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const options: Option[] = [
  {
    id: '1',
    name: 'Khách sạn 1',
    default_post_image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazon…/images/default-post-image/khach-san-nha-hang.png',
    image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
  },
  {
    id: '2',
    name: 'Khách sạn 2',
    default_post_image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazon…/images/default-post-image/khach-san-nha-hang.png',
    image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
  },
  {
    id: '3',
    name: 'Khách sạn 3',
    default_post_image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazon…/images/default-post-image/khach-san-nha-hang.png',
    image:
      'https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/category/khach-san-nha-hang.png',
  },
];

const PostCategoryIds: React.FC<IPostCategoryIds> = (props) => {
  const { selectedOptions, setSelectedOptions } = props;
  const [categories, setCategories] = React.useState<Option[]>([]);

  const getAllParentCategories = async () => {
    try {
      const result = await categoriesApi.getAllParentCategories("vi");
      if (result) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getAllParentCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    const newInputValue = (event?.target as HTMLInputElement)?.id;
    if (newInputValue) {
      const updatedOptions = [...options];
      const existingOption = updatedOptions.find(
        (option) => option.id === newInputValue,
      );

      if (!existingOption) {
        // Thêm tùy chọn mới vào danh sách tùy chọn
        updatedOptions.push({
          id: newInputValue,
          name: newInputValue,
          default_post_image: newInputValue,
          image: newInputValue,
        });
        // Cập nhật danh sách tùy chọn
        setSelectedOptions(updatedOptions);
      }
    }
  };

  const handleOptionChange = (
    event: React.ChangeEvent<{}>,
    values: Option[],
  ) => {
    setSelectedOptions(values);
  };

  return (
    <Box sx={{ marginTop: '24px' }} className="post-category-ids-container">
      <Typography
        sx={{ fontWeight: 600, color: '#000000' }}
        variant="body1"
        component="label"
        htmlFor="jobTitle"
      >
        Danh mục nghề <span style={{ color: 'red' }}>*</span>
      </Typography>
      <Autocomplete
        open={true}
        multiple
        options={categories}
        getOptionLabel={(option) => option.name}
        value={selectedOptions}
        onChange={handleOptionChange}
        onInputChange={handleInputChange}
        // sx={{ marginTop: '4px', maxWidth: '10%' }} // Thay đổi style ở đây
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            size="medium"
            id="jobs"
            placeholder="Chọn"
            sx={{ borderRadius: '20px' }}
          />
        )}
      />
    </Box>
  );
};

export default PostCategoryIds;
