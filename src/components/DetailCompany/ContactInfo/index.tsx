import {
  CameraComunityIcon,
  CateIcon,
  IconCategory,
  LocationDetailPostIcon,
  LocationHomeIcon,
  MailDetailPostIcon,
  NoImageCompany,
  PhoneDetailPostIcon,
  TaxCodeDetailPostIcon,
  WebDetailPostIcon,
} from '#components/Icons';
import { PersonIcon } from '#components/Icons/iconCandidate';
import { Box } from '@mui/material';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styles from './style.module.scss';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './style.scss';
import { useLocation } from 'react-router-dom';

interface IContactInfo {
  company: any;
}

const ContactInfo: React.FC<IContactInfo> = (props) => {
  const { company } = props;
  const location = useLocation();
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [position, setPosition] = useState<any>({});

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const handleClickShowMap = () => {
    if (company?.address) {
      window.open(
        'https://www.google.com/maps/place/' +
          `${company?.address}, ${
            company?.companyLocation ? company?.companyLocation.fullName : ''
          }, ${
            company?.companyLocation?.district
              ? company?.companyLocation?.district?.fullName
              : ''
          }, ${
            company?.companyLocation?.district?.province
              ? company?.companyLocation?.district?.province?.fullName
              : ''
          }`,
      );
    }
  };

  const handleSendMail = () => {
    const emailLink = 'mailto:' + company?.email;
    window.location.href = emailLink;
  };

  const getLocation = async (address: string) => {
    // const apiKey = 'AIzaSyAroW1_MSLcU7aNvX9FjvNZy8eps9yDtr0';
    const apiKey = 'AIzaSyA8gjzoebEdb7Oy7x-StIr214ojMVq25qM';
    // const apiKey = 'AIzaSyDdDbr7ZTHQxUyo3p-A0G5rHYNU3J3QTbU';
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log('Data', data);

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setPosition(location);
        return location;
      } else {
        throw new Error('Không tìm thấy địa điểm.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    const address1 = `${company?.address}, ${company?.companyLocation?.fullName}, ${company?.companyLocation?.district?.fullName}, ${company?.companyLocation?.district?.province?.fullName}`;

    getLocation(address1);
  }, []);

  return (
    <div className={styles.contact_info_container}>
      <div className={styles.contact_info_content}>
        <div className={styles.company_information}>
          <div className={styles.company_information_left}>
            <div className={styles.company_information_describe}>
              <h3>
                {languageRedux === 1
                  ? 'Mô tả'
                  : languageRedux === 2
                    ? 'Describe'
                    : languageRedux === 3 && '설명'}
              </h3>
              <TextArea
                value={
                  company?.description
                    ? company.description
                    : languageRedux === 1
                      ? 'Thông tin công ty chưa cập nhật'
                      : languageRedux === 2
                        ? 'Company information not updated yet'
                        : languageRedux === 3 &&
                          '회사정보가 업데이트되지 않았습니다.'
                }
                autoSize
                // showCount
              />
            </div>
            <div className={styles.company_information_basic}>
              <h3>
                {languageRedux === 1
                  ? 'Thông tin cơ bản'
                  : languageRedux === 2
                    ? 'Basic information'
                    : languageRedux === 3 && '기준 정부·'}
              </h3>
              <ul>
                <li>
                  <TaxCodeDetailPostIcon />
                  <p>
                    {languageRedux === 1
                      ? 'Mã số thuế: '
                      : languageRedux === 2
                        ? 'Tax code: '
                        : languageRedux === 3 && '세금 코드: '}
                    <span>
                      {company?.taxCode
                        ? company.taxCode
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </span>
                  </p>
                </li>
                <li>
                  <LocationDetailPostIcon />
                  <p>
                    {languageRedux === 1
                      ? 'Địa chỉ: '
                      : languageRedux === 2
                        ? 'Address: '
                        : languageRedux === 3 && '주소'}
                    <span
                      onClick={handleClickShowMap}
                      style={
                        company?.address
                          ? { cursor: 'pointer', color: '#0D99FF' }
                          : {}
                      }
                    >
                      {company?.address
                        ? `${company.address}, ${company.companyLocation.fullName}, ${company.companyLocation.district.fullName}, ${company.companyLocation.district.province.fullName}`
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </span>
                  </p>
                </li>
                <li>
                  <MailDetailPostIcon />
                  <p>
                    {'Email: '}
                    <span
                      onClick={handleSendMail}
                      style={
                        company?.address
                          ? { cursor: 'pointer', color: '#0D99FF' }
                          : {}
                      }
                    >
                      {company?.email
                        ? company.email
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </span>
                  </p>
                </li>
                <li>
                  <PhoneDetailPostIcon />
                  <p>
                    {languageRedux === 1
                      ? 'Điện thoại: '
                      : languageRedux === 2
                        ? 'Phone: '
                        : languageRedux === 3 && '전화번호'}
                    <span>
                      {company?.phone
                        ? company.phone
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </span>
                  </p>
                </li>
                <li>
                  <WebDetailPostIcon />
                  <p>
                    {languageRedux === 1
                      ? 'Trang web: '
                      : languageRedux === 2
                        ? 'Website: '
                        : languageRedux === 3 && '웹사이트'}
                    <span
                      style={
                        company?.address
                          ? { cursor: 'pointer', color: '#0D99FF' }
                          : {}
                      }
                    >
                      <a
                        style={
                          company?.address
                            ? { cursor: 'pointer', color: '#0D99FF' }
                            : {}
                        }
                        href={company?.website ? company?.website : '#'}
                      >
                        {company?.website
                          ? company.website
                          : languageRedux === 1
                            ? 'Thông tin công ty chưa cập nhật'
                            : languageRedux === 2
                              ? 'Company information not updated yet'
                              : languageRedux === 3 &&
                                '회사정보가 업데이트되지 않았습니다.'}
                      </a>
                      {/* {company?.website
                        ? company.website
                        :languageRedux === 1
                      ? 'Thông tin công ty chưa cập nhật'
                      : languageRedux === 2
                        ? 'Company information not updated yet'
                        : languageRedux === 3 &&
                          '회사정보가 업데이트되지 않았습니다.'} */}
                    </span>
                  </p>
                </li>
                <li>
                  <IconCategory />
                  <p>
                    {languageRedux === 1
                      ? 'Ngành nghề: '
                      : languageRedux === 2
                        ? 'Category: '
                        : languageRedux === 3 && '카테고리'}
                    <span>
                      {company?.companyCategory?.fullName
                        ? company.companyCategory.fullName
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </span>
                  </p>
                </li>
                <li>
                  <PersonIcon width={24} height={24} />
                  <p>
                    {languageRedux === 1
                      ? 'Quy mô công ty: '
                      : languageRedux === 2
                        ? 'Company size: '
                        : languageRedux === 3 && '회사 규모'}
                    <span>
                      {company?.companySizeInfomation?.nameText
                        ? company?.companySizeInfomation?.nameText
                        : languageRedux === 1
                          ? 'Thông tin công ty chưa cập nhật'
                          : languageRedux === 2
                            ? 'Company information not updated yet'
                            : languageRedux === 3 &&
                              '회사정보가 업데이트되지 않았습니다.'}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={styles.company_information_right}
            // style={{
            //   display:
            //     location?.pathname === '/detail-company' ? 'block' : 'none',
            // }}
            // style={{ display: 'none' }}
          >
            {Object.keys(position).length !== 0 ? (
              <>
                <h3>
                  {languageRedux === 1
                    ? 'Xem bản đồ'
                    : languageRedux === 2
                      ? 'View the map'
                      : languageRedux === 3 && '지도 보기'}
                </h3>
                <MapContainer
                  className="leaf_let_map"
                  center={[position.lat, position.lng]}
                  zoom={20}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[position.lat, position.lng]}>
                    <Popup>{`${company.address}, ${company.companyLocation.fullName}, ${company.companyLocation.district.fullName}, ${company.companyLocation.district.province.fullName}`}</Popup>
                  </Marker>
                </MapContainer>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.company_image}>
          <h3>
            {languageRedux === 1
              ? 'Hình ảnh công ty'
              : languageRedux === 2
                ? "Company's images"
                : languageRedux === 3 && '회사 이미지'}
          </h3>

          {company && company?.id && company.images?.length !== 0 ? (
            <div
              className={styles.company_role_images}
              style={{
                height:
                  company?.images && company?.images?.length > 0
                    ? 'fit-content'
                    : '310px',
                border:
                  company?.images && company?.images?.length > 0
                    ? 'none'
                    : '1px solid #ccc',
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
                          // company !== undefined ||
                          company &&
                          company?.images &&
                          company?.images?.length !== 0
                            ? 'none'
                            : 'flex',
                      }}
                    >
                      {location.pathname === '/profile' ? (
                        <></>
                      ) : (
                        <CameraComunityIcon />
                      )}
                      <div className={styles.noImage_company}>
                        <NoImageCompany />
                        <p>
                          {languageRedux === 1
                            ? 'Chưa có hình ảnh về công ty'
                            : languageRedux === 2
                              ? 'No image of the company yet'
                              : languageRedux === 3 &&
                                '아직 회사 이미지가 없습니다.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <Box className={styles.list_iamges}>
                  {company &&
                    company?.images?.map((item: any, index: number) => (
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
          ) : company &&
            company?.images !== null &&
            company?.images?.length === 0 ? (
            <div className={styles.noImage_company}>
              <NoImageCompany />
              <p>
                {languageRedux === 1
                  ? 'Chưa có hình ảnh về công ty'
                  : languageRedux === 2
                    ? 'No image of the company yet'
                    : languageRedux === 3 && '아직 회사 이미지가 없습니다.'}
              </p>
            </div>
          ) : (
            <p>
              {languageRedux === 1
                ? 'Thông tin công ty chưa cập nhật'
                : languageRedux === 2
                  ? 'Company information not updated yet'
                  : languageRedux === 3 &&
                    '회사정보가 업데이트되지 않았습니다.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
