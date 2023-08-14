import React, { useEffect, FormEvent, useState } from 'react';
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
import RollTop from '#components/RollTop';
import { InboxOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
import { CameraComunityIcon, DeleteImageComunityIcon } from '#components/Icons';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { validatePostImages } from 'validations';

const ComunityCreatePost = () => {
    const { TextArea } = Input;
    const [valueTitle, setValueTitle] = useState('');
    const [valueContent, setValueContent] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [isDragActive, setIsDragActive] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

    console.log("selectedFiles", selectedFiles);
    console.log("selectedImages", selectedImages);


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
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
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
                message.error("Hình không đúng định dạng");
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
                    setSelectedFiles((prevState) => [
                        ...prevState,
                        ...compressedImages
                        // .map((image: any) => ({
                        //     image,
                        //     preview: window.URL.createObjectURL(image),
                        // })),
                    ]);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        if (files) {
            if (files.length > 5) {
                message.error("Tối đa 5 hình");
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
                            message.error("Tối đa 5 hình");
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
    }

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
                message.error("Tối đa 5 hình");
                return;
            }

            const newFileSelected = [
                ...selectedFiles,
                ...fileUploaded
                // .map((file: any) => ({
                //   image: file,
                //   preview: file.preview,
                // })),
            ];

            if (newFileSelected.length > 5) {
                message.error("Tối đa 5 hình");

                return;
            }

            setSelectedFiles(newFileSelected);

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
                            message.error("Tối đa 5 hình");

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

    return (
        <div className="comunity-create-post-container">
            <Navbar />
            <div className="comunity-create-post-content">
                <div className="create-post-header">
                    <h3>Tạo bài viết mới</h3>
                </div>
                <div className="create-post-body">
                    <div className="create-post-body_input">
                        <h3>1. Chủ đề</h3>
                        <Input
                            value={valueTitle}
                            onChange={(e: any) => setValueTitle(e.target.value)}
                            className="input-title"
                            placeholder="Chủ đề cần chia sẻ"
                        />
                    </div>
                    <div className="create-post-body_input">
                        <h3>2. Nội dung</h3>
                        <TextArea
                            value={valueContent}
                            onChange={(e: any) => setValueContent(e.target.value)}
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
                                    display: selectedFiles.length > 0 ? "block" : "none",
                                    cursor: "pointer"
                                }}
                            >
                                <label htmlFor="submit">Thêm hình ảnh</label>
                                <input
                                    id='submit'
                                    type="file"
                                    name="images"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </p>
                        </h3>
                        <div className="post-comunity-images"
                            style={{
                                height: selectedFiles.length > 0 ? "fit-content" : "310px",
                                border: selectedFiles.length > 0 ? "none" : "1px solid #ccc",
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
                                                display: selectedFiles.length === 0 || isDragActive
                                                    ? "flex" : "none"
                                            }}
                                        >
                                            <CameraComunityIcon />
                                            <p>Thêm hình ảnh cho bài viết</p>
                                        </div>
                                    </div>
                                </section>
                                <Box className="list_iamges">
                                    {selectedImages.map((image: any, index: number) => (
                                        <div
                                            className="item-image"
                                            key={index}
                                        >
                                            <img
                                                key={index}
                                                src={image}
                                                alt="Ảnh lỗi"
                                            />
                                            <div
                                                className="deleteButton"
                                                style={{
                                                    zIndex: isDragActive ? "0" : "2"
                                                }}
                                                onClick={() => handleDeleteImage(index)}
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
                        <Button className={
                            valueTitle == '' || valueContent == '' || selectedFiles.length === 0 ?
                                "submit" : "submit full-info"}>
                            {
                                valueTitle == '' || valueContent == '' || selectedFiles.length === 0 ?
                                    "Lưu bài" :
                                    "Đăng bài viết"
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <RollTop />
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Footer />
        </div >
    );
};

export default ComunityCreatePost;
