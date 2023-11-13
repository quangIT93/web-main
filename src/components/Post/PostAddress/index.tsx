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
  //       languageRedux === 1 ? 'vi' : 'en',
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
          languageRedux === 1 ? 'vi' : 'en',
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
          languageRedux === 1 ? 'vi' : 'en',
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
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
  };

  const handleChangeWardId = (e: any, value: any) => {
    setSelectedWard(value);
    setWardId(value.id);
  };

  const handleChangeAddress = (e: any) => {
    setAddress(e.target.value);
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
            {language?.post_page?.city} <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.province_fullName || ''}
            value={fillProvince || selectedProvince || null}
            onChange={handleProvinceChange}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={language?.post_page?.place_city}
                size="small"
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
                  : 'Please enter company name'}
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
            {language?.post_page?.district}{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistrict ? dataDistrict : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={fillDistrict || selectedDistrict || null}
            onChange={handleDistrictChange}
            disableClearable
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder={language?.post_page?.place_district}
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
                  : 'Please enter district name'}
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
            {language?.post_page?.ward} <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWard ? dataWard : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={fillWardId || selectedWard || null}
            onChange={handleChangeWardId}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={language?.post_page?.place_ward}
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
                  : 'Please enter ward name'}
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
            {language?.post_page?.address}{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '0.5rem' }}
            placeholder={language?.post_page?.place_address}
          />
          <div className="wrap-noti_input">
            {address && address.length > 255 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Địa chỉ không được vượt quá 255 ký tự'
                  : 'Address cannot exceed 255 characters'}
              </span>
            ) : !address ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Địa chỉ không được bỏ trống'
                  : 'Address cannot be empty'}
              </span>
            ) : (
              <></>
            )}
            <span className="number-text">{`${
              address ? address.length : '0'
            }/255`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostAddress);
