import React, { memo } from 'react';
import { Box, Button, Typography } from '@mui/material';
//@ts-ignore
import imageCompression from 'browser-image-compression';
import { validatePostImages } from 'validations';
//@ts-ignore
import { toast } from 'react-toastify';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDropzone } from 'react-dropzone';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import { message } from 'antd';

import './style.scss';
import { blob } from 'stream/consumers';
interface PostImageProps {
  selectedFiles: any;
  selectedImages: any;
  selectedFillImages: any;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PostImage: React.FC<PostImageProps> = (props) => {
  const {
    selectedFiles,
    setSelectedFiles,
    setSelectedImages,
    selectedImages,
    selectedFillImages,
  } = props;

  const [image, setImage] = React.useState<any>();
  const [files, setFiles] = React.useState<any>([]);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  };

  const [messageApi, contextHolder] = message.useMessage();

  const theme = useTheme();
  const ixsobile = useMediaQuery(theme.breakpoints.down('xs'));

  // const [imageFile, setImageFile] = React.useState<any>(null);
  React.useEffect(() => {
    const loadImage = async () => {
      // Bước 1: Xác định định dạng file từ URL
      const imageExtension = await selectedFillImages?.map((image: any) =>
        image.split('.').pop(),
      );
      // const imageType = `image/${
      //   imageExtension === 'jpg' ? 'jpeg' : imageExtension
      // }`;

      // // Bước 2: Chuyển đổi dữ liệu hình ảnh thành dạng file
      const blobImage = await imageExtension.map(
        (image: any) => new Blob([image], { type: image }),
      );

      const imageFile = await blobImage.map(
        (blob: any) =>
          new File([blob], `${Math.random().toString(10)}.${blob.type}`, {
            type: `image/${blob.type === 'jpg' ? 'jpeg' : blob.type}`,
          }),
      );

      if (imageFile.length > 0) {
        const validateImagesReply = validatePostImages(imageFile);
        if (validateImagesReply.isError) {
          console.log('::: Invalid images');
          return toast.warn('Ảnh không đúng định dạng');
        } else {
          try {
            const compressedImages: any = [];
            console.log('Compressed image ::: ', imageFile);
            await Promise.all(
              imageFile.map(async (image: any) => {
                const compressedImage = await imageCompression(image, options);
                compressedImages.push(
                  new File([compressedImage], compressedImage.name, {
                    type: compressedImage.type,
                  }),
                );
              }),
            );
            // console.log('Original image ::: ', imagesUpload)

            setSelectedFiles((prevState) => [
              ...prevState,
              ...compressedImages.map((image: any) => ({
                image,
                preview: window.URL.createObjectURL(image),
              })),
            ]);
          } catch (error) {
            console.log('error', error);
          }
        }
      }
    };

    loadImage();
  }, [selectedFillImages]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
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
            content: 'Chỉ có thể tối đa 5 ảnh',
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
            content: 'Chỉ có thể tối đa 5 ảnh',
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
                  content: 'Chỉ có thể tối đa 5 ảnh',
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

  const acceptedFileItems = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }: any) => {
    return (
      <li key={file?.path}>
        {file?.path} - {file.size} bytes
        <ul>
          {errors.map((event: any) => (
            <li key={event.code}>{event.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  const thumbs = files.map((file: any, index: number) => (
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <div
          className="deleteButton"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteImage(index);
          }}
        >
          <CloseOutlinedIcon style={{ color: 'white' }} />
        </div>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt="ảnh lỗi"
        />
      </div>
    </div>
  ));

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

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

    setImage(event.target.files && event.target.files[0]);

    const imagesUpload: any = Array.from(
      event.target.files ? event.target.files : [],
    );

    selectedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
    console.log('selected file', selectedFiles);

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
    console.log('imagesToCheck', imagesToCheck);

    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck);
      if (validateImagesReply.isError) {
        // console.log('::: Invalid images');
        return toast.warn('Ảnh không đúng định dạng');
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
          console.log('imagesToCheck', imagesToCheck);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (files) {
      if (files.length > 5) {
        messageApi.open({
          type: 'error',
          content: 'Chỉ có thể tối đa 5 ảnh',
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
                content: 'Chỉ có thể tối đa 5 ảnh',
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
            <p>
              Kéo và thả nhiều file ảnh ở đây, hoặc click vào để chọn file ảnh
            </p>
            {/* <aside className="thumbs-containter">
              {thumbs}
            </aside> */}
          </div>
        </section>
        <Box sx={{ display: 'flex', minWidth: '150px', marginTop: '40px' }}>
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
                alt={`ảnh bị lỗi`}
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
          Có thể tải tối đa 5 ảnh, 5 ảnh không quá 5MB. (Định dạng cho phép:
          jpeg, jpg, png)
        </Typography>
        <Button
          variant="outlined"
          component="label"
          disabled={selectedImages.length === 5}
        >
          Tải ảnh
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
