import { Box } from '@mui/material';
import { message } from 'antd';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { validatePostImages } from 'validations';
import imageCompression from 'browser-image-compression';
import { useDropzone } from 'react-dropzone';
import { CameraComunityIcon, DeleteImageComunityIcon } from '#components/Icons';
import apiCompany from 'api/apiCompany';

interface IEditImageCompany {
  dataCompany: any;
  setDataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditImageCompany: React.FC<IEditImageCompany> = (props) => {
  const { dataCompany, setDataCompany, is_profile, setUnsavedChanges } = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [selectedImages, setSelectedImages] = React.useState<
    {
      id: any;
      imagePath: any;
    }[]
  >([]);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [deleteImages, setDeleteImages] = React.useState<any[]>([]);
  const [existedIamgeId, setExistedIamgeId] = React.useState<any[]>([]);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  };

  useEffect(() => {
    setSelectedImages(dataCompany.images);
    //have to set array of existed iamge ids .
    // Because when adding new images,
    // the images array of dataCompany have only file image to upload server
    // it doesn't have containing existing images.
    setExistedIamgeId(dataCompany.images.map((image: any) => image.id));
  }, []);
  // console.log(dataCompany);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    setUnsavedChanges(true);
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

    // console.log(dataCompany.images);

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
            setDataCompany((preValue: any) => ({
              ...preValue,
              images: compressedImages,
            }));
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (files) {
      if (files.length > 5) {
        message.error(language?.limit_5_img);
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
                imagePath: item,
              })),
            ];
            if (newImageSelected.length > 5) {
              message.error(language?.limit_5_img);
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
      // console.log(dataCompany.images);

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
        message.error(language?.limit_5_img);
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
        message.error(language?.limit_5_img);

        return;
      }

      if (selectedImages.length < 5) {
        setSelectedFiles(newFileSelected);
        setDataCompany((preValue: any) => ({
          ...preValue,
          images: newFileSelected,
        }));
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
                imagePath: item,
              })),
            ];
            if (newImageSelected.length > 5) {
              message.error(language?.limit_5_img);

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

  const handleDeleteImage = async (index: number, deleteId: any) => {
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
    setDataCompany((preValue: any) => {
      const updatedImages = [...preValue.images];
      updatedImages.splice(index, 1);
      return {
        ...preValue,
        images: updatedImages,
      };
    });
    setDeleteImages((prevImages) => {
      const deletedImages = [...prevImages];
      deletedImages.push(deleteId);
      return deletedImages;
    });
    if (dataCompany.deletedImages) {
      if (deleteId && !dataCompany.deletedImages.includes(deleteId)) {
        setDataCompany((preValue: any) => ({
          ...preValue,
          deletedImages: [...preValue.deletedImages, deleteId],
        }));
      }
    }

    //delete existed images
    if (deleteId && existedIamgeId.includes(deleteId)) {
      const formDataImages = new FormData();
      formDataImages.append('imagesId', deleteId);
      // for (const pair of formDataImages.entries()) {
      //   console.log(`${pair[0]}, ${pair[1]}`);
      // }
      const resultImages = await apiCompany.updateCampanyImages(
        dataCompany.id,
        formDataImages,
      );
    }
  };

  return (
    <div
      className="edit-image-company-container"
      style={{
        pointerEvents: is_profile ? 'none' : 'unset',
      }}
    >
      <div className="edit-image-company-content">
        <h3>
          <span>
            {languageRedux === 1 ? 'Hình ảnh công ty' : "Company's image"}
          </span>
          <p
            style={{
              display:
                selectedImages.length > 0 || selectedFiles.length > 0
                  ? 'block'
                  : 'none',
              cursor: 'pointer',
            }}
          >
            <label style={{ cursor: 'pointer' }} htmlFor="submit">
              {languageRedux === 1 ? 'Thêm hình ảnh' : 'Add images'}
            </label>
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
          className="company-images"
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
                  <p>
                    {languageRedux === 1
                      ? 'Thêm hình ảnh cho bài viết'
                      : 'Add an image to the post'}
                  </p>
                </div>
              </div>
            </section>
            <Box className="list_iamges">
              {selectedImages.map((item: any, index: number) => (
                <div className="item-image" key={index}>
                  <img
                    key={index}
                    src={item?.imagePath}
                    alt={language?.err_none_img}
                  />
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
          </Box>
        </div>
      </div>
    </div>
  );
};

export default memo(EditImageCompany);
