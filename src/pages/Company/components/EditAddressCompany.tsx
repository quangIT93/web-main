import React, { useState, useEffect, useCallback, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
import locationApi from '../../../api/locationApi';

import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any
  dataCompany: any
}

const EditAddressCompany: React.FC<IEditPostAddress> = memo((props) => {
  const { setDataCompany, dataCompany } = props;

  const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistricts, setDataDistrict] = useState<any>(null);
  const [dataWards, setDataWard] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);

  console.log("selectedDistrict ", dataCompany?.ward?.district?.name);
  console.log("dataWards ", dataWards);

  useEffect(() => {
    if (dataProvinces && !selectedProvince) {
      setSelectedProvince(
        dataProvinces?.find(
          (dataProvince: any) =>
            dataProvince?.name === dataCompany?.ward?.district?.province?.name,
        ),
      );
    }
  }, [dataProvinces]);

  useEffect(() => {
    if (dataDistricts && !selectedDistrict) {
      setSelectedDistrict(
        dataDistricts?.find(
          (dataDistrict: any) =>
            dataDistrict?.full_name === dataCompany?.ward?.district?.fullName,
        ),
      );
    }

  }, [dataDistricts]);

  useEffect(() => {
    if (dataWards && !selectedWard) {
      setSelectedWard(
        dataWards?.find(
          (dataWard: any) => dataWard?.full_name === dataCompany?.ward?.fullName,
        ),
      );
    }
  }, [dataWards]);

  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllProvinces();

      if (allLocation) {
        setDataProvinces(allLocation?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (dataCompany && dataDistricts === null) {
        const districts = await locationApi.getDistrictsById(
          dataCompany?.ward?.district?.province?.id,
        );

        if (districts) {
          setDataDistrict(districts?.data);
        }
      } else {
        if (selectedProvince) {
          const districts = await locationApi.getDistrictsById(
            selectedProvince?.id,
          );
          if (districts) {
            setDataDistrict(districts?.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get All ward by ward id
  const getDataWard = async () => {
    try {
      if (dataDistricts && dataWards === null) {
        const allward = await locationApi.getWardsId(
          dataCompany?.ward?.id,
          '',
        );
        if (allward) {
          setDataWard(allward?.data);
        }
      } else {
        if (selectedDistrict) {
          const allward = await locationApi.getWardsId(
            selectedDistrict?.id,
            '',
          );
          if (allward) {
            setDataWard(allward?.data);
          }
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
    console.log("value province ", value);

    setDataWard([]);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
  };

  const handleChangeWardId = (event: any, value: any) => {
    setSelectedWard(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      ward_id: value?.id,
    }));
  };

  const handleChangeAddress = (e: any) => {
    setDataCompany((preValue: any) => ({
      ...preValue,
      address: e.target?.value,
    }));
  };

  return (
    <div className="edit-address-company-container">
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="addressTitle"
          >
            Thành Phố <span style={{ color: 'red' }}>*</span>
          </Typography>

          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.name || ''}
            value={selectedProvince || null}
            // onChange={handleProvinceChange}
            onChange={(event: any, newValue: any | null) => {
              handleProvinceChange(event, newValue);
              console.log("newValue", newValue);

            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tỉnh/TP"
                size="small"
                value={selectedProvince?.name}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.name === value.name;
            }}
            style={{ marginTop: '8px' }}
          />
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Quận <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistricts ? dataDistricts : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            renderInput={(params: any) => (
              <TextField {...params} placeholder="Quận/Huyện" size="small" />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{ marginTop: '8px' }}
          />
        </div>
      </div>
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Phường/Xã <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWards ? dataWards : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            renderInput={(params) => (
              <TextField {...params} placeholder="Phường/Xã" size="small" />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{ marginTop: '8px' }}
          />
        </div>

        <div className="edit-titleAddress">
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
            value={dataCompany?.address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '8px' }}
            placeholder="Tên đường, toà nhà, số nhà"
          />
        </div>
      </div>
    </div>
  );
});

export default memo(EditAddressCompany);
