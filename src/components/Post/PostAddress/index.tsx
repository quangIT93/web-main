import React, { useState, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// data
import locationApi from '../../../api/locationApi';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';

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
    // setFillProvince,
    setFillDistrict,
    setFillWardId,
    language,
    languageRedux
  } = props;
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistrict, setDataDistrict] = useState<any>(null);
  const [dataWard, setDataWard] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  console.log("selectedProvince", selectedProvince);

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
  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllLocation(
        languageRedux === 1 ? "vi" : "en"
      );

      if (allLocation) {
        setDataProvinces(allLocation.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get All locations by location id

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (selectedProvince) {
        const districts = await locationApi.getDistrictsById(
          selectedProvince.province_id,
          languageRedux === 1 ? "vi" : "en",
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
        const allward = await locationApi.getWardsId(selectedDistrict.id,
          languageRedux === 1 ? "vi" : "en",
        );
        if (allward) {
          setDataWard(allward.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllProvinces();
    // getAllLocations()
    // delete param when back to page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageRedux]);

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
    <div className="post-address">
      <div className="post-address_top">
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1 ?
                post.city :
                postEn.city
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.province_fullName || ''}
            value={fillProvince || selectedProvince || null}
            onChange={handleProvinceChange}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} placeholder={
                languageRedux === 1 ?
                  post.place_city :
                  postEn.place_city
              } size="small" />
            )}
            style={{ marginTop: '0.5rem' }}
          />
        </div>
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1 ?
                post.district :
                postEn.district
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistrict ? dataDistrict : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={fillDistrict || selectedDistrict || null}
            onChange={handleDistrictChange}
            disableClearable
            renderInput={(params: any) => (
              <TextField {...params} placeholder={
                languageRedux === 1 ?
                  post.place_district :
                  postEn.place_district
              } size="small" />
            )}
            style={{ marginTop: '0.5rem' }}
          />
        </div>
      </div>
      <div className="post-address_bottom">
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1 ?
                post.ward :
                postEn.ward
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWard ? dataWard : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={fillWardId || selectedWard || null}
            onChange={handleChangeWardId}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} placeholder={
                languageRedux === 1 ?
                  post.place_ward :
                  postEn.place_ward
              } size="small" />
            )}
            style={{ marginTop: '0.5rem' }}
          />
        </div>
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {
              languageRedux === 1 ?
                post.address :
                postEn.address
            }{' '}<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '0.5rem' }}
            placeholder={
              languageRedux === 1 ?
                post.place_address :
                postEn.place_address
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PostAddress);
