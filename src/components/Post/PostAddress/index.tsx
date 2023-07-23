import React, { useState, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// data
import locationApi from '../../../api/locationApi';

interface IPostAddress {
  setWardId: React.Dispatch<React.SetStateAction<any>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  address: string;
}

const PostAddress: React.FC<IPostAddress> = (props) => {
  const { setWardId, address, setAddress } = props;
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistrict, setDataDistrict] = useState<any>(null);
  const [dataWard, setDataWard] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
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
      const allLocation = await locationApi.getAllProvinces();

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
          selectedProvince.id,
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
        const allward = await locationApi.getWardsId(selectedDistrict.id, '');
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
  }, []);

  React.useEffect(() => {
    getDataDistrict();
    // delete param when back to page
  }, [selectedProvince]);

  React.useEffect(() => {
    getDataWard();
    // delete param when back to page
  }, [selectedDistrict]);

  const handleProvinceChange = (event: any, value: any) => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedProvince(value);
    setDataWard([]);
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
            Thành Phố <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.name || ''}
            value={selectedProvince || null}
            onChange={handleProvinceChange}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} placeholder="Tỉnh/TP" size="small" />
            )}
          />
        </div>
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Quận <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistrict ? dataDistrict : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            disableClearable
            renderInput={(params: any) => (
              <TextField {...params} placeholder="Quận/Huyện" size="small" />
            )}
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
            Phường/Xã <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWard ? dataWard : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} placeholder="Phường/Xã" size="small" />
            )}
          />
        </div>
        <div className="post-title">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Địa chỉ <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '0.5rem' }}
            placeholder="Tên đường, toà nhà, số nhà"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PostAddress);
