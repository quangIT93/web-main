import React, { useState, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// data
import locationApi from '../../../api/locationApi';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';
import { useSelector } from 'react-redux';
// import redux
import { RootState } from 'store';
interface IPostAddress {
  setWardId: React.Dispatch<React.SetStateAction<any>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setFillProvince: React.Dispatch<React.SetStateAction<any>>;
  setFillDistrict: React.Dispatch<React.SetStateAction<any>>;
  setFillWardId: React.Dispatch<React.SetStateAction<any>>;
  address: string;
  wardId: string;
  fillWardId: any;
  fillProvince: any;
  fillDistrict: any;
  language: any;
  languageRedux: any;
  setIsValidSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostAddress: React.FC<IPostAddress> = (props) => {
  const {
    setWardId,
    address,
    setAddress,
    // wardId,
    fillWardId,
    fillProvince,
    fillDistrict,
    setFillProvince,
    setFillDistrict,
    setFillWardId,
    language,
    languageRedux,
    setIsValidSubmit,
  } = props;
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  // const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistrict, setDataDistrict] = useState<any>(null);
  const [dataWard, setDataWard] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const dataProvinces = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  };

  // get All locations by location id
  // const getAllLocations = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllProvinces()

  //     if (allLocation) {
  //       setDataProvinces(allLocation.data)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // get All locations by location id
  // const getAllProvinces = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllLocation(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );

  //     if (allLocation) {
  //       setDataProvinces(allLocation.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // get All locations by location id

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (selectedProvince) {
        const districts = await locationApi.getDistrictsById(
          selectedProvince.province_id,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (districts) {
          setDataDistrict(districts.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get All ward by ward id
  const getDataWard = async () => {
    try {
      if (selectedDistrict) {
        const allward = await locationApi.getWardsId(
          selectedDistrict.id,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (allward) {
          setDataWard(allward.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // React.useEffect(() => {
  // getAllProvinces();
  // getAllLocations()
  // delete param when back to page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageRedux]);

  React.useEffect(() => {
    getDataDistrict();
    // delete param when back to page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince, languageRedux]);

  React.useEffect(() => {
    getDataWard();
    // delete param when back to page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict, languageRedux]);

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedProvince(value);
    setDataWard([]);
    setFillWardId(null);
    setFillDistrict(null);
    setFillProvince(null);
    setIsValidSubmit(false);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
    setFillDistrict(value);
    setIsValidSubmit(false);
  };

  const handleChangeWardId = (e: any, value: any) => {
    setSelectedWard(value);
    setWardId(value.id);
    setIsValidSubmit(false);
  };

  const handleChangeAddress = (e: any) => {
    setAddress(e.target.value);
    setIsValidSubmit(false);
  };

  return (
    <div className="post-address modal-person">
      <div className="post-address_top">
        <div
          className="post-title"
        // style={{ position: 'relative' }}
        >
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1
                ? 'Thành phố'
                : languageRedux === 2
                  ? 'City'
                  : languageRedux === 3
                    ? '도시'
                    : 'Thành phố'
            } <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.province_fullName || ''}
            value={fillProvince || selectedProvince || null}
            onChange={handleProvinceChange}
            disableClearable
            id="post_job_city"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  languageRedux === 1
                    ? 'Thành phố'
                    : languageRedux === 2
                      ? 'City'
                      : languageRedux === 3
                        ? '도시'
                        : 'Thành phố'
                }
                size="small"
              // id="post_job_city"
              />
            )}
            style={{ marginTop: '0.5rem' }}
          />
          <div
            className="wrap-noti_input"
          // style={{ position: 'absolute', bottom: '-15px' }}
          >
            {!fillProvince && selectedProvince === null ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng nhập tên công ty'
                  : languageRedux === 2
                    ? 'Please enter company name'
                    : languageRedux === 3 && '회사명을 입력해주세요'}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="post-title"
        // style={{ position: 'relative' }}
        >
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1
                ? 'Quận'
                : languageRedux === 2
                  ? 'District'
                  : languageRedux === 3
                    ? '군'
                    : 'Quận'
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistrict ? dataDistrict : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={fillDistrict || selectedDistrict || null}
            onChange={handleDistrictChange}
            disableClearable
            id="post_job_district"
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder={
                  languageRedux === 1
                    ? 'Quận'
                    : languageRedux === 2
                      ? 'District'
                      : languageRedux === 3
                        ? '군'
                        : 'Quận'
                }
                size="small"
              />
            )}
            style={{ marginTop: '0.5rem' }}
          />
          <div
            className="wrap-noti_input"
          // style={{ position: 'absolute', bottom: '-15px' }}
          >
            {selectedDistrict === null && !fillDistrict ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng nhập tên quận'
                  : languageRedux === 2
                    ? 'Please enter district name'
                    : languageRedux === 3 && '지역명을 입력해주세요'}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="post-address_bottom">
        <div
          className="post-title"
        // style={{ position: 'relative' }}
        >
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1
                ? 'Phường/Xã'
                : languageRedux === 2
                  ? 'Ward'
                  : languageRedux === 3
                    ? '동/읍'
                    : 'Phường/Xã'
            } <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWard ? dataWard : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={fillWardId || selectedWard || null}
            onChange={handleChangeWardId}
            disableClearable
            id="post_job_ward"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  languageRedux === 1
                    ? 'Phường/Xã'
                    : languageRedux === 2
                      ? 'Ward'
                      : languageRedux === 3
                        ? '동/읍'
                        : 'Phường/Xã'
                }
                size="small"
              />
            )}
            style={{ marginTop: '0.5rem' }}
          />
          <div
            className="wrap-noti_input"
          // style={{ position: 'absolute', bottom: '-15px' }}
          >
            {selectedWard === null && fillWardId?.id === '' ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng nhập tên phường'
                  : languageRedux === 2
                    ? 'Please enter ward name'
                    : languageRedux === 3 && '병동명을 입력해주세요'}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1
                ? 'Địa chỉ'
                : languageRedux === 2
                  ? 'Address'
                  : languageRedux === 3
                    ? '주소'
                    : 'Địa chỉ'
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="post_job_address"
            name="title"
            value={address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '0.5rem' }}
            placeholder={
              languageRedux === 1
                ? 'Địa chỉ'
                : languageRedux === 2
                  ? 'Address'
                  : languageRedux === 3
                    ? '주소'
                    : 'Địa chỉ'
            }
          />
          <div className="wrap-noti_input">
            {address && address.length > 255 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Địa chỉ không được vượt quá 255 ký tự'
                  : languageRedux === 2
                    ? 'Address cannot exceed 255 characters'
                    : languageRedux === 3 &&
                    '주소는 255자를 초과할 수 없습니다.'}
              </span>
            ) : !address ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Địa chỉ không được bỏ trống'
                  : languageRedux === 2
                    ? 'Address cannot be empty'
                    : languageRedux === 3 && '주소가 비어 있으면 안 됩니다.'}
              </span>
            ) : (
              <></>
            )}
            <span className="number-text">{`${address ? address.length : '0'
              }/255`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostAddress);
