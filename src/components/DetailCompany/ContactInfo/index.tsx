import { CameraComunityIcon, CateIcon, IconCategory, LocationDetailPostIcon, LocationHomeIcon, MailDetailPostIcon, PhoneDetailPostIcon, TaxCodeDetailPostIcon, WebDetailPostIcon } from '#components/Icons';
import { PersonIcon } from '#components/Icons/iconCandidate';
import { Box } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styles from './style.module.scss';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './style.scss'
import { useLocation } from 'react-router-dom';

interface IContactInfo {
    company: any;
}

const ContactInfo: React.FC<IContactInfo> = (props) => {
    const { company } = props;
    const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)
    const language = useSelector((state: RootState) => state.dataLanguage.languages)

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    const location = useLocation()

    return (
        <div className={styles.contact_info_container}>
            <div className={styles.contact_info_content}>
                <div className={styles.company_information}>
                    <div className={styles.company_information_left}>
                        <div className={styles.company_information_describe}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "Mô tả" : "Describe"
                                }
                            </h3>
                            <TextArea
                                value={company?.description ? company.description :
                                    languageRedux === 1 ?
                                        "Thông tin công ty chưa cập nhật" :
                                        "Company information not updated yet"
                                }
                                autoSize
                            // showCount
                            />
                        </div>
                        <div className={styles.company_information_basic}>
                            <h3>
                                {
                                    languageRedux === 1 ?
                                        "Thông tin cơ bản" : "Basic information"
                                }
                            </h3>
                            <ul>
                                <li>
                                    <TaxCodeDetailPostIcon />
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Mã số thuế: " : "Tax code: "
                                        }
                                        <span>
                                            {
                                                company?.taxCode ? company.taxCode :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <LocationDetailPostIcon />
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Địa chỉ: " : "Address: "
                                        }
                                        <span>
                                            {
                                                company?.address ? company.address :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <MailDetailPostIcon />
                                    <p>
                                        {'Email: '}
                                        <span>
                                            {
                                                company?.email ? company.email :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <PhoneDetailPostIcon />
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Điện thoại: " : "Phone: "
                                        }
                                        <span>
                                            {
                                                company?.phone ? company.phone :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <WebDetailPostIcon />
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Trang web: " : "Website: "
                                        }
                                        <span>
                                            {
                                                company?.website ?
                                                    company.website :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <IconCategory />
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Ngành nghề: " : "Category: "
                                        }
                                        <span>
                                            {
                                                company?.companyCategory?.fullName ?
                                                    company.companyCategory.fullName :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <PersonIcon width={24} height={24} />
                                    <p>
                                        {
                                            languageRedux === 1 ?
                                                "Quy mô công ty: " : "Company size: "
                                        }
                                        <span>
                                            {
                                                company?.companySizeInfomation?.nameText ?
                                                    company.companySizeInfomation.nameText :
                                                    languageRedux === 1 ?
                                                        "Thông tin công ty chưa cập nhật" :
                                                        "Company information not updated yet"
                                            }
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.company_information_right}
                        style={{
                            display: location?.pathname === '/detail-company' ?
                                "block" : "none"
                        }}
                    >
                        <h3>
                            {
                                languageRedux === 1 ?
                                    "Xem bản đồ" : "View the map"
                            }
                        </h3>
                        <MapContainer
                            className="leaf_let_map"
                            center={[10.808315, 106.730790]}
                            zoom={20}
                            scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[10.808315, 106.730790]}>
                                <Popup>79 Quốc Hương, Thảo Điền, Q.2, TP.HCM</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
                <div className={styles.company_image}>
                    <h3>
                        {
                            languageRedux === 1 ?
                                "Hình ảnh công ty" : "Company's iamges"
                        }
                    </h3>
                    <div
                        className={styles.company_role_images}
                        style={{
                            height:
                                company?.images?.length > 0 ? 'fit-content' : '310px',
                            border:
                                company?.images?.length > 0 ? 'none' : '1px solid #ccc',
                        }}
                    >
                        <Box p="0rem 0">
                            <section className={styles.drag_img_container}>
                                <div
                                    // {...getRootProps({
                                    className={styles.dropzone}
                                // })}
                                >
                                    {/* <input {...getInputProps()} /> */}
                                    <div
                                        className={styles.drag_img_camera}
                                        style={{
                                            display:
                                                company === undefined || company?.images?.length === 0 ? 'flex' : 'none',
                                        }}
                                    >
                                        <CameraComunityIcon />
                                        <p>
                                            {languageRedux === 1
                                                ? 'Chưa có hình ảnh về công ty'
                                                : 'No image of the company yet'}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <Box className={styles.list_iamges}>
                                {company?.images?.map((item: any, index: number) => (
                                    <div className={styles.item_image} key={index}>
                                        <img
                                            key={index}
                                            src={item?.imagePath}
                                            alt={language?.err_none_img}
                                        />
                                    </div>
                                ))}
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo;