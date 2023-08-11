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
import { CameraComunityIcon } from '#components/Icons';

const ComunityCreatePost = () => {
    const { TextArea } = Input;
    const [valueTitle, setValueTitle] = useState('');
    const [valueContent, setValueContent] = useState('');
    const [valueImage, setValueImage] = useState<any>([]);
    const { Dragger } = Upload;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [isDrag, setIsDrag] = useState(false);

    const [fileList, setFileList] = useState<UploadFile[]>(
        // dataCompany?.logoPath && dataCompany?.logopath !== ''
        //   ? [
        //     {
        //       uid: '-1',
        //       name: 'logo.png',
        //       status: 'done',
        //       url: dataCompany?.logoPath,
        //       thumbUrl: dataCompany?.logoPath,
        //     },
        //   ]
        //   : 
        [],
    );

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: "picture-card",
        // fileList,
        // onChange: ({ fileList: newFileList }) => {
        //     setFileList(newFileList);
        //     setValueImage(newFileList);

        //     // console.log('newFileList', newFileList);
        // },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
                setFileList(info.fileList);
                setValueImage((preValue: any) => ({
                    ...preValue,
                    ...info.fileList,
                }));
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
            setValueImage(newFileList);

            return true;
        },
        beforeUpload: (file) => {
            // const isPNG = file.type === 'application/pdf';
            var checFileSize = true;
            // if (!isPNG) {
            //   message.error(`${file.name} không phải là file pdf`);
            // } else
            if (file.size > 1024 * 1024 * 5) {
                checFileSize = false;
                message.error("File phải nhỏ hơn 5mb");
            } else {
                setFileList([file]);
                return false;
            }
            return Upload.LIST_IGNORE || checFileSize;
        },
        onPreview: async (file: UploadFile) => {
            handlePreview(file)
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
            // setFileList(e.dataTransfer.files);
            // setValueImage((preValue: any) => ({
            //     ...preValue,
            //     ...e.dataTransfer.files,
            // }));
        },
    };

    console.log("valueImage", valueImage);
    console.log("fileLisst", fileList);


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

    const handleImageChange = async (event: any) => {
        const files = event.target.files;
        const imagesUpload: any = Array.from(
            event.target.files ? event.target.files : [],
        );
        // const imagesToCheck =
        //     valueImage.length + imagesUpload.length > 5
        //         ? imagesUpload.slice(0, 5 - valueImage.length)
        //         : imagesUpload;

        // if (imagesToCheck.length > 0) {
        //     const compressedImages: any = [];
        //     await Promise.all(
        //         imagesToCheck.map(async (image: any) => {
        //             const compressedImage = await imageCompression(image, options);
        //             compressedImages.push(
        //                 new File([compressedImage], compressedImage.name, {
        //                     type: compressedImage.type,
        //                 }),
        //             );
        //         }),
        //     );
        //     setValueImage((prevState: any) => [
        //         ...prevState,
        //         ...compressedImages,
        //     ]);
        // }
    }
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
                                    display: fileList.length > 0 ? "block" : "none"
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
                        <Dragger {...props}
                            style={{
                                height: fileList.length === 0 ? "340px" :
                                    fileList.length <= 4 ? "200px" :
                                        "390px",
                                border: fileList.length === 0 ? "0.5px solid #d9d9d9" : "none",
                                background: fileList.length === 0 ? "white" : "transparent",
                                zIndex: 1
                            }}
                        >
                            <p className="ant-upload-drag-icon"
                                style={{
                                    display: fileList.length === 0 ? "block" : "none"
                                }}
                            >
                                <CameraComunityIcon />
                            </p>
                            {/* <p className="ant-upload-text">Click or drag file to this area to upload</p> */}
                            <p className="ant-upload-hint"
                                style={{
                                    display: fileList.length === 0 ? "block" : "none"
                                }}
                            >
                                Thêm hình ảnh cho bài viết
                            </p>
                        </Dragger>
                    </div>
                    <div className="save_btn">
                        <Button className="submit">
                            Lưu bài
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
