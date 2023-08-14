import React, { useEffect, memo } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { useDropzone } from 'react-dropzone';

// import { blobToBase64 } from 'blob-util'

//@ts-ignore
import imageCompression from 'browser-image-compression';
import { validatePostImages } from 'validations';
//@ts-ignore
import { toast } from 'react-toastify';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { message } from 'antd';
// import axios from 'axios';
import './style.scss';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';

interface IEditPostImage {
  editDataPosted: any;
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>;
  dataPosted: any;
  languageRedux: any;
}

const EditPostImage: React.FC<IEditPostImage> = (props) => {
  const { editDataPosted, setEditDataPosted, dataPosted, languageRedux } =
    props;

  const [selectedFiles, setSelectedFiles] = React.useState<
    {
      image: any;
      preview: any;
    }[]
  >([]);

  // /////////////////////////////////////////////////////////////////////
  // const [imageFile, setImageFile] = React.useState<any>(null);
  // useEffect(() => {
  //   const loadImage = async () => {
  //     try {
  //       // Bước 1: Xác định định dạng file từ URL
  //       const imageExtension = dataPosted?.image?.split('.').pop();
  //       const imageType = `image/${
  //         imageExtension === 'jpg' ? 'jpeg' : imageExtension
  //       }`;

  //       // Bước 2: Chuyển đổi dữ liệu hình ảnh thành dạng file
  //       const imageBlob = new Blob([dataPosted.image], { type: imageType });
  //       const imageFile = new File([imageBlob], `image.${imageExtension}`, {
  //         type: imageType,
  //       });

  //       setImageFile(imageFile);
  //     } catch (error) {
  //       console.error('Error loading image:', error);
  //     }
  //   };

  //   loadImage();
  // }, [dataPosted.image]);

  // /////////////////////////////////////////////////////////////////
  const [selectedImages, setSelectedImages] = React.useState<any[]>([]);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const [files, setFiles] = React.useState<File[]>([]);

  const [messageApi, contextHolder] = message.useMessage();
  // console.log('selectedFiles', selectedFiles);
  // console.log('selectedImages', selectedImages);
  const {
    getRootProps,
    getInputProps,
    // , acceptedFiles
  } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDragEnter: () => {
      setIsDragActive(true);
    },
    onDragLeave: () => {
      setIsDragActive(false);
    },
    onDrop: (acceptedFiles: File[]) => {
      setIsDragActive(false);
      const fileUploaded = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      // console.log('file upload', fileUploaded);

      if (fileUploaded.length > 5) {
        messageApi.open({
          type: 'error',
          content: languageRedux === 1 ? post.limit_5_img : postEn.limit_5_img,
        });
        return;
      }

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
          content: languageRedux === 1 ? post.limit_5_img : postEn.limit_5_img,
        });

        return;
      }

      setSelectedFiles(newFileSelected);

      setEditDataPosted((preValue: any) => ({
        ...preValue,
        images: newFileSelected,
      }));

      const newImages: any[] = [];

      for (let i = 0; i < fileUploaded.length; i++) {
        const file = fileUploaded[i];
        const reader = new FileReader();
        // console.log('reader', reader);

        reader.onload = () => {
          const imageDataURL = reader.result as string;

          newImages.push({
            id: null,
            image: imageDataURL,
            status: null,
          });

          if (newImages.length === fileUploaded.length) {
            const newImageSelected = [...selectedImages, ...newImages];
            if (newImageSelected.length > 5) {
              messageApi.open({
                type: 'error',
                content:
                  languageRedux === 1 ? post.limit_5_img : postEn.limit_5_img,
              });

              return;
            }
            setSelectedImages(newImageSelected);
            // event.target.value = '';
          }
        };

        reader.readAsDataURL(file);
      }

      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  // const thumbs = files.map((file: any, index: number) => (
  //   <div
  //     key={index}
  //     style={{
  //       border: '1px solid #ccc',
  //       position: 'relative',
  //       marginRight: '12px',
  //       height: '150px',
  //       width: '150px',
  //     }}
  //   >
  //     <img
  //       key={index}
  //       src={file.preview}
  //       alt={`ảnh bị lỗi`}
  //       style={{
  //         height: '150px',
  //         width: '150px',
  //         objectFit: 'cover',
  //       }}
  //     />
  //     <div
  //       className="deleteButton"
  //       onClick={() => handleDeleteImage(index, 1)}
  //       style={{
  //         position: 'absolute',
  //         top: '6px',
  //         right: '6px',
  //         border: 'solid 1px #ccc',
  //         width: '24px',
  //         height: '24px',
  //         backgroundColor: '#ccc',
  //         cursor: 'pointer',
  //       }}
  //     >
  //       <CloseOutlinedIcon />
  //     </div>
  //   </div>
  // ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  };

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

    const imagesUpload: any = Array.from(
      event.target.files ? event.target.files : [],
    );

    // console.log('imagesUpload', imagesUpload)
    // console.log('selectedFiles', selectedFiles)
    // console.log('selectedImages', selectedImages)

    const imagesToCheck =
      selectedFiles.length + imagesUpload.length > 5
        ? imagesUpload.slice(0, 5 - selectedImages?.length)
        : imagesUpload;

    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck);
      if (validateImagesReply.isError) {
        // console.log('::: Invalid images')
        return toast.warn(languageRedux === 1 ? post.err_img : postEn.err_img);
      } else {
        try {
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

          setEditDataPosted((preValue: any) => ({
            ...preValue,
            images: [
              ...preValue.images,
              ...compressedImages.map((image: any) => ({
                image,
                preview: window.URL.createObjectURL(image),
              })),
            ],
          }));
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (files && dataPosted) {
      if (files.length > 5) {
        messageApi.open({
          type: 'error',
          content: languageRedux === 1 ? post.limit_5_img : postEn.limit_5_img,
        });
        return;
      }
      const newImages: any[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = () => {
          const imageDataURL = reader.result as string;
          newImages.push({
            id: null,
            image: imageDataURL,
            status: null,
          });

          if (newImages.length === files.length) {
            // console.log('new', newImages);
            setSelectedImages((prevImages: any) => [
              ...prevImages,
              ...newImages,
            ]);
          }
          event.target.value = '';
        };

        reader.readAsDataURL(file);
      }
    }
  };

  useEffect(() => {
    if (selectedFiles) {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        images: [...selectedFiles],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataPosted) {
      setSelectedImages(dataPosted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteImage = (index: number, id: number | null) => {
    setSelectedImages((prevImages: any) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setSelectedFiles((prevFiles: any) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index - dataPosted.length - 1, 1);
      return updatedFiles;
    });

    setEditDataPosted((preValue: any) => {
      const updatedFiles = [...preValue.images];
      updatedFiles.splice(index - dataPosted.length - 1, 1);

      return {
        ...preValue,
        images: updatedFiles,
      };
    });

    if (id && !editDataPosted.deletedImages.includes(id)) {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        deletedImages: [...preValue.deletedImages, { id: id }],
      }));
    }
  };

  return (
    <div className="edit-post_image">
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
              {languageRedux === 1
                ? post.drag_drop_multi
                : postEn.drag_drop_multi}
            </p>
            {/* <aside className="thumbs-containter">
              {thumbs}
            </aside> */}
          </div>
        </section>
      </Box>
      <Box p="0rem 0">
        <Box sx={{ display: 'flex', minWidth: '150px', marginTop: '40px' }}>
          {selectedImages?.map((image: any, index: number) => (
            <div
              className="item-editPost_image"
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
                src={image.image}
                alt={
                  languageRedux === 1 ? post.err_none_img : postEn.err_none_img
                }
                style={{
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                }}
              />
              <div
                className="deleteButton"
                onClick={() => handleDeleteImage(index, image.id)}
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

        {/* <Typography
          variant="body1"
          color="#ccc"
          p="1rem 0"
          sx={{ fontStyle: 'italic' }}
        >
          {
            languageRedux === 1 ?
              post.verify_upload :
              postEn.verify_upload
          }
        </Typography> */}

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
          {languageRedux === 1 ? post.verify_upload : postEn.verify_upload}
        </Typography>
        <Button
          variant="outlined"
          component="label"
          disabled={selectedImages?.length === 5}
        >
          {languageRedux === 1 ? post.upload_img : postEn.upload_img}
          <input
            type="file"
            name="images"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            multiple
          />
        </Button>
      </Box>
    </div>
  );
};

export default memo(EditPostImage);
