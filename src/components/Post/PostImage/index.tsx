import React, { memo } from 'react';
import { Box, Button, Typography } from '@mui/material';
//@ts-ignore
import imageCompression from 'browser-image-compression';
import { validatePostImages } from 'validations';
//@ts-ignore
import { toast } from 'react-toastify';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDropzone } from 'react-dropzone';

// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';

import { message } from 'antd';

import { post } from 'validations/lang/vi/post';

import axios from 'axios';
// import { saveAs } from 'file-saver';

import './style.scss';
import { postEn } from 'validations/lang/en/post';
// import { blob } from 'stream/consumers';
interface PostImageProps {
  selectedFiles: any;
  selectedImages: any;
  selectedFillImages: any;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  languageRedux: any;
  language: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostImage: React.FC<PostImageProps> = (props) => {
  const {
    selectedFiles,
    setSelectedFiles,
    setSelectedImages,
    selectedImages,
    selectedFillImages,
    languageRedux,
    language,
    setIsValidSubmit
  } = props;

  const [isDragActive, setIsDragActive] = React.useState(false);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  };

  const [messageApi, contextHolder] = message.useMessage();

  // const theme = useTheme();
  // const ixsobile = useMediaQuery(theme.breakpoints.down('xs'));

  async function downloadAndConvertImagesToFiles(urls: any) {
    try {
      const convertedFiles = [];
      setSelectedFiles([]);

      for (const url of urls) {
        const response = await axios.get(url, {
          responseType: 'blob',
        });
        console.log('response', response);

        const imageExtension = response.config.url?.split('.').pop();
        const file = new File([response.data], getFileNameFromUrl(url), {
          type: `image/${imageExtension === 'jpg' ? 'jpeg' : imageExtension}`,
        });
        console.log('imageExtension', imageExtension);
        console.log('file', file);

        convertedFiles.push(file);
        console.log('convertedFiles', convertedFiles);
      }
      if (convertedFiles.length > 0) {
        const validateImagesReply = validatePostImages(convertedFiles);
        console.log('validateImagesReply', validateImagesReply);

        if (validateImagesReply.isError) {
          console.log('::: Invalid images');
          return toast.warn(language?.err_none_img);
        } else {
          const compressedImages: any = [];
          console.log('compressedImages', compressedImages);

          await Promise.all(
            convertedFiles.map(async (image: any) => {
              const compressedImage = await imageCompression(image, options);
              compressedImages.push(
                new File([compressedImage], compressedImage.name, {
                  type: compressedImage.type,
                }),
              );
            }),
          );

          setSelectedFiles((prevState) => [
            ...prevState,
            ...compressedImages.map((image: any) => ({
              image,
              preview: window.URL.createObjectURL(image),
            })),
          ]);
        }
      }

      // console.log('Converted files:', convertedFiles);
      // Ở đây bạn có thể thực hiện các xử lý khác với mảng convertedFiles, ví dụ lưu chúng vào state, ...
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function getFileNameFromUrl(url: any) {
    // Hàm này sẽ lấy tên file từ URL, có thể thay đổi phù hợp với cách đặt tên file của bạn
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }

  React.useEffect(() => {
    downloadAndConvertImagesToFiles(selectedImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFillImages]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    // maxFiles: 5,
    onDragEnter: () => {
      setIsDragActive(true);
    },
    onDragLeave: () => {
      setIsDragActive(false);
    },
    onDrop: async (acceptedFiles: File[]) => {
      setIsDragActive(false);

      const fileUploaded = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      // setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
      //   preview: URL.createObjectURL(file)
      // })));
      // console.log('fileUploaded : ', fileUploaded);

      if (fileUploaded.length > 5) {
        messageApi.open({
          type: 'error',
          content: language?.limit_5_img,
        });
        return;
      }

      // const imagesToCheck =
      // selectedFiles.length + imagesUpload.length > 5
      //   ? imagesUpload.slice(0, 5 - selectedImages.length)
      //   : imagesUpload;

      // console.log(
      //   ' imagesUpload.slice(0, 5 - selectedImages.length)',
      //   imagesUpload.slice(0, 5 - selectedImages.length)
      // )
      // console.log(' imagesToCheck', imagesToCheck)
      // console.log(' imagesToCheck.length', imagesToCheck.length)
      // if (fileUploaded.length > 0) {
      //   const validateImagesReply = validatePostImages(selectedFiles);
      //   if (validateImagesReply.isError) {
      //     console.log('::: Invalid images');
      //     return toast.warn('Ảnh không đúng định dạng');
      //   } else {
      //     try {
      // const compressedImages: any = [];
      // await Promise.all(
      //   imagesToCheck.map(async (image: any) => {
      //     const compressedImage = await imageCompression(image, options);
      //     compressedImages.push(
      //       new File([compressedImage], compressedImage.name, {
      //         type: compressedImage.type,
      //       }),
      //     );
      //   }),
      // );
      // console.log('Original image ::: ', imagesUpload)
      // console.log('Compressed image ::: ', compressedImages)

      const newFileSelected = [
        ...selectedFiles,
        ...fileUploaded.map((file: any) => ({
          image: file,
          preview: file.preview,
        })),
      ];

      if (newFileSelected.length > 5) {
        messageApi.open({
          type: 'error',
          content: language?.limit_5_img,
        });

        return;
      }

      setSelectedFiles(newFileSelected);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      // }

      const newImages: string[] = [];

      for (let i = 0; i < fileUploaded.length; i++) {
        const file = fileUploaded[i];
        const reader = new FileReader();
        // console.log(reader);

        reader.onload = () => {
          const imageDataURL = reader.result as string;
          newImages.push(imageDataURL);

          if (newImages.length === fileUploaded.length) {
            const newImageSelected = [...selectedImages, ...newImages];
            if (newImageSelected.length > 5) {
              messageApi.open({
                type: 'error',
                content: language?.limit_5_img,
              });

              return;
            }
            setSelectedImages(newImageSelected);
            // event.target.value = '';
          }
        };

        reader.readAsDataURL(file);
      }
    },
  });

  React.useEffect(() => {
    // selectedFiles.map((value: any) => {
    // console.log('file img', value.preview);
    // });
    return () => {
      // Clean up all selectedFiles previews when the component unmounts

      selectedFiles.length !== 0 &&
        selectedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    setIsValidSubmit(false)
    // setImage(event.target.files && event.target.files[0]);

    const imagesUpload: any = Array.from(
      event.target.files ? event.target.files : [],
    );

    selectedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));

    const imagesToCheck =
      selectedFiles.length + imagesUpload.length > 5
        ? imagesUpload.slice(0, 5 - selectedImages.length)
        : imagesUpload;

    // console.log(
    //   ' imagesUpload.slice(0, 5 - selectedImages.length)',
    //   imagesUpload.slice(0, 5 - selectedImages.length)
    // )
    // console.log(' imagesToCheck', imagesToCheck)
    // console.log(' imagesToCheck.length', imagesToCheck.length)
    // console.log('imagesToCheck', imagesToCheck);

    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck);
      if (validateImagesReply.isError) {
        // console.log('::: Invalid images');
        return toast.warn(language?.err_none_img);
      } else {
        try {
          console.log('imagesToCheck', imagesToCheck);

          const compressedImages: any = [];
          await Promise.all(
            imagesToCheck.map(async (image: any) => {
              const compressedImage = await imageCompression(image, options);
              compressedImages.push(
                new File([compressedImage], compressedImage.name, {
                  type: compressedImage.type,
                }),
              );
            }),
          );
          // console.log('Original image ::: ', imagesUpload)
          // console.log('Compressed image ::: ', compressedImages)

          setSelectedFiles((prevState) => [
            ...prevState,
            ...compressedImages.map((image: any) => ({
              image,
              preview: window.URL.createObjectURL(image),
            })),
          ]);
          // console.log('imagesToCheck', imagesToCheck);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (files) {
      if (files.length > 5) {
        messageApi.open({
          type: 'error',
          content: language?.limit_5_img,
        });
        return;
      }
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        // console.log(reader);

        reader.onload = () => {
          const imageDataURL = reader.result as string;
          newImages.push(imageDataURL);

          if (newImages.length === files.length) {
            const newImageSelected = [...selectedImages, ...newImages];
            if (newImageSelected.length > 5) {
              messageApi.open({
                type: 'error',
                content: language?.limit_5_img,
              });
              return;
            }
            setSelectedImages(newImageSelected);
            event.target.value = '';
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  return (
    <div className="postImages">
      {contextHolder}
      <Box p="0rem 0">
        <section className="drag-img-container">
          <div
            {...getRootProps({
              className: isDragActive ? 'dropzone on-drag' : 'dropzone',
            })}
          >
            <input {...getInputProps()} />
            {/* <p>Drag and drop some files here, or click to select files</p> */}
            <p>{language?.post_page?.drag_drop_multi}</p>
            {/* <aside className="thumbs-containter">
              {thumbs}
            </aside> */}
          </div>
        </section>
        <Box
          sx={{
            display: 'flex',
            minWidth: '150px',
            marginTop: '50px',
            flexWrap: 'wrap',
          }}
          className="list-img-post"
        >
          {selectedImages.map((image: any, index: number) => (
            <div
              className="item-image"
              style={{
                // padding: '12px',
                // border: '1px solid #ccc',
                position: 'relative',
                marginRight: '12px',
                height: '150px',
                width: '150px',
              }}
              key={index}
            >
              <img
                key={index}
                src={image}
                alt={language?.err_none_img}
                style={{
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                }}
              />
              <div
                className="deleteButton"
                onClick={() => handleDeleteImage(index)}
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  border: 'solid 1px #ccc',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ccc',
                  cursor: 'pointer',
                }}
              >
                <CloseOutlinedIcon />
              </div>
            </div>
          ))}
        </Box>

        {/* <Box>
          <CreatePostImages
          images={images}
          handleRemoveImage={handleRemoveImage}
          />
        </Box> */}
      </Box>
      <Box mt="0">
        <Typography
          variant="body1"
          color="#ccc"
          p="1rem 0"
          sx={{ fontStyle: 'italic' }}
        >
          {language?.post_page?.verify_upload}
        </Typography>
        <Button
          variant="outlined"
          component="label"
          disabled={selectedImages.length === 5}
        >
          {language?.post_page?.upload_img}
          <input
            type="file"
            name="images"
            hidden
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </Button>
      </Box>
    </div>
  );
};

export default memo(PostImage);
