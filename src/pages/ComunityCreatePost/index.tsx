import React, { useState, FormEvent } from 'react';
// import { useHomeState } from '../Home/HomeState'
// import { useSearchParams } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
// import moment, { Moment } from 'moment';
// @ts-ignore
import { Navbar } from '#components';
import './style.scss';
import imageCompression from 'browser-image-compression';

import { Button, Input, message, Upload, Modal } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

// @ts-ignore
import RollTop from '#components/RollTop';
// import { InboxOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
// @ts-ignore
import { CameraComunityIcon, DeleteImageComunityIcon } from '#components/Icons';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// @ts-ignore
import { validatePostImages } from 'validations';

// @ts- ignore
import apiCommunity from '../../api/apiCommunity';
import communityApi from '../../api/apiCommunity';

const ComunityCreatePost = () => {
  const { TextArea } = Input;
  const [valueTitle, setValueTitle] = useState('');
  const [valueContent, setValueContent] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [selectedImages, setSelectedImages] = React.useState<
    {
      id: any;
      image: any;
    }[]
  >([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const POST_COMMUNITY_ID = searchParams.get('post-community');
  const [communityPost, setCommunityPost] = React.useState<any>();
  const [deleteImages, setDeleteImages] = React.useState<any[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const dataProfile = useSelector((state: RootState) => state.profile.profile);
  React.useEffect(() => {
    const community_success = localStorage.getItem('community_success');
    const accountId = localStorage.getItem('accountId');
    if (dataProfile && dataProfile.accountId !== accountId) {
      window.open('/', '_parent');
    }
  }, []);

  console.log('selectedFiles', selectedFiles);
  console.log('selectedImages', selectedImages);
  // console.log('valueTitle', valueTitle);
  // console.log('valueContent', valueContent);

  const handleGetDetailCommunityById = async () => {
    try {
      if (POST_COMMUNITY_ID) {
        const result = await communityApi.getCommunityDetailId(
          POST_COMMUNITY_ID,
        );
        if (result) {
          setCommunityPost(result?.data);
          setValueTitle(result?.data?.title);
          setValueContent(result?.data?.content);
          setSelectedImages(result?.data?.image);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetDetailCommunityById();
  }, [POST_COMMUNITY_ID]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  // const options = {
  //     maxSizeMB: 1,
  //     maxWidthOrHeight: 840,
  // };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

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
        message.error('Hình không đúng định dạng');
        return;
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
          if (selectedImages.length < 5) {
            setSelectedFiles((prevState) => [
              ...prevState,
              ...compressedImages,
              // .map((image: any) => ({
              //     image,
              //     preview: window.URL.createObjectURL(image),
              // })),
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (files) {
      if (files.length > 5) {
        message.error('Tối đa 5 hình');
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
            const newImageSelected = [
              ...selectedImages,
              ...newImages.map((item: any, index: number) => ({
                id: index,
                image: item,
              })),
            ];
            if (newImageSelected.length > 5) {
              message.error('Tối đa 5 hình');
              return;
            }
            setSelectedImages(newImageSelected);
            event.target.value = '';
          }
        };

        reader.readAsDataURL(file);
        console.log('newImages', newImages);
      }
    }
  };

  const handleDeleteImage = (index: number, deleteId: any) => {
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
    setDeleteImages((prevImages) => {
      const deletedImages = [...prevImages];
      deletedImages.push(deleteId);
      return deletedImages;
    });
  };

  console.log(deleteImages);

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
        message.error('Tối đa 5 hình');
        return;
      }

      const newFileSelected = [
        ...selectedFiles,
        ...fileUploaded,
        // .map((file: any) => ({
        //   image: file,
        //   preview: file.preview,
        // })),
      ];

      if (newFileSelected.length > 5) {
        message.error('Tối đa 5 hình');

        return;
      }

      if (selectedImages.length < 5) {
        setSelectedFiles(newFileSelected);
      }

      const newImages: string[] = [];

      for (let i = 0; i < fileUploaded.length; i++) {
        const file = fileUploaded[i];
        const reader = new FileReader();
        // console.log(reader);

        reader.onload = () => {
          const imageDataURL = reader.result as string;
          newImages.push(imageDataURL);

          if (newImages.length === fileUploaded.length) {
            const newImageSelected = [
              ...selectedImages,
              ...newImages.map((item: any, index: number) => ({
                id: index,
                image: item,
              })),
            ];
            if (newImageSelected.length > 5) {
              message.error('Tối đa 5 hình');

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
    return () => {
      selectedFiles.length !== 0 &&
        selectedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  // valid values form data
  const validValue = () => {
    if (valueTitle === '') {
      return {
        message: 'Vui lòng nhập tiêu đề bài viết',
        checkForm: false,
      };
    }

    if (valueContent === '') {
      return {
        message: 'Vui lòng nhập nội dung bài viết',
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };

  const handleSaveCommunity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', valueTitle);
    formData.append('content', valueContent);
    selectedFiles.forEach((image: any) => {
      formData.append('images', image);
    });
    // POST_COMMUNITY_ID &&
    deleteImages.forEach((id: any) => {
      formData.append('deleteImages', id);
    });

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    if (formData) {
      POST_COMMUNITY_ID ? updateCommunity(formData) : createCommunity(formData);
    }
  };

  const updateCommunity = async (formData: any) => {
    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        const result = await apiCommunity.putCommunityByAccount(
          Number(POST_COMMUNITY_ID),
          formData,
        );
        if (result) {
          console.log('sửa bài viết thành công');
          messageApi.open({
            type: 'success',
            content: 'sửa bài viết thành công',
          });
          window.open('/comunity_create_success', '_parent');
          localStorage.setItem('community_success', 'true');
          // window.open('/comunity_create_success', '_parent')
        } else {
          console.log('sửa bài viết thất bại');
          messageApi.open({
            type: 'error',
            content: 'sửa bài viết thất bại',
          });
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error) {}
  };

  const createCommunity = async (formData: any) => {
    // console.log('form saved', form);

    const { message, checkForm } = validValue();
    try {
      if (checkForm) {
        const result = await apiCommunity.postCommunications(formData);

        if (result) {
          console.log('tạo bài viết thành công');
          window.open('/comunity_create_success', '_parent');
          localStorage.setItem('community_success', 'true');
        } else {
          console.log('tạo bài viết thất bại');
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="comunity-create-post-container">
      <Navbar />
      {contextHolder}
      <div className="comunity-create-post-content">
        <div className="create-post-header">
          <h3>{POST_COMMUNITY_ID ? 'Sửa bài viết' : 'Tạo bài viết mới'}</h3>
        </div>
        <div className="create-post-body">
          <div className="create-post-body_input">
            <h3>1. Chủ đề</h3>
            <Input
              value={valueTitle}
              onChange={(e: any) => {
                if (e.target.value.length <= 500) {
                  setValueTitle(e.target.value);
                } else {
                  message.error('Tiêu đề không được vượt quá 500 ký tự');
                }
              }}
              className="input-title"
              placeholder="Chủ đề cần chia sẻ"
            />
          </div>
          <div className="create-post-body_input">
            <h3>2. Nội dung</h3>
            <TextArea
              value={valueContent}
              onChange={(e: any) => {
                if (e.target.value.length <= 1000) {
                  setValueContent(e.target.value);
                } else {
                  message.error(
                    'Nội dung bài viết không được vượt quá 500 ký tự',
                  );
                }
              }}
              className="input-content"
              placeholder="Nội dung cần chia sẻ"
              autoSize={{ minRows: 5, maxRows: 9 }}
            />
          </div>
          <div className="create-post-body_input">
            <h3>
              <span>3. Thêm hình ảnh</span>
              <p
                style={{
                  display:
                    selectedImages.length > 0 || selectedFiles.length > 0
                      ? 'block'
                      : 'none',
                  cursor: 'pointer',
                }}
              >
                <label htmlFor="submit">Thêm hình ảnh</label>
                <input
                  id="submit"
                  type="file"
                  name="images"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
              </p>
            </h3>
            <div
              className="post-comunity-images"
              style={{
                height:
                  selectedImages.length > 0 || selectedFiles.length > 0
                    ? 'fit-content'
                    : '310px',
                border:
                  selectedImages.length > 0 || selectedFiles.length > 0
                    ? 'none'
                    : '1px solid #ccc',
              }}
            >
              <Box p="0rem 0">
                <section className="drag-img-container">
                  <div
                    {...getRootProps({
                      className: isDragActive ? 'dropzone on-drag' : 'dropzone',
                    })}
                  >
                    <input {...getInputProps()} />
                    <div
                      className="drag-img-camera"
                      style={{
                        display:
                          (selectedImages.length === 0 &&
                            selectedFiles.length === 0) ||
                          isDragActive
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <CameraComunityIcon />
                      <p>Thêm hình ảnh cho bài viết</p>
                    </div>
                  </div>
                </section>
                <Box className="list_iamges">
                  {selectedImages.map((item: any, index: number) => (
                    <div className="item-image" key={index}>
                      <img key={index} src={item?.image} alt="Ảnh lỗi" />
                      <div
                        className="deleteButton"
                        style={{
                          zIndex: isDragActive ? '0' : '2',
                        }}
                        onClick={() => handleDeleteImage(index, item?.id)}
                      >
                        <DeleteImageComunityIcon />
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
            </div>
          </div>
          <div className="save_btn">
            <Button
              onClick={handleSaveCommunity}
              className={
                valueTitle === '' ||
                valueContent === '' ||
                (selectedImages.length === 0 && selectedFiles.length === 0)
                  ? 'submit'
                  : 'submit full-info'
              }
            >
              {valueTitle === '' ||
              valueContent === '' ||
              (selectedImages.length === 0 && selectedFiles.length === 0)
                ? 'Lưu bài'
                : 'Đăng bài viết'}
            </Button>
          </div>
        </div>
      </div>
      <RollTop />
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Footer />
    </div>
  );
};

export default ComunityCreatePost;
