import React, { useState, useEffect, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
import locationApi from '../../../api/locationApi';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { company } from 'validations/lang/vi/company';
import { companyEn } from 'validations/lang/en/company';

// import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
}

const EditAddressCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language);
  const { setDataCompany, dataCompany } = props;

  const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistricts, setDataDistrict] = useState<any>(null);
  const [dataWards, setDataWard] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);

  // console.log("dataDistricts", dataDistricts);
  // console.log("dataWards", dataWards);
  // console.log("selectedProvince", selectedProvince);
  // console.log("selectedDistrict", selectedDistrict);
  // console.log("selectedWard", selectedWard);
  // console.log("dataProvinces", dataProvinces);


  useEffect(() => {
    if (dataProvinces && !selectedProvince) {
      setSelectedProvince(
        dataProvinces?.find(
          (dataProvince: any) =>
            dataProvince?.province_fullName ===
            dataCompany?.companyLocation?.district?.province?.fullName,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProvinces, languageRedux]);

  useEffect(() => {
    if (dataDistricts && !selectedDistrict) {
      setSelectedDistrict(
        dataDistricts?.find(
          (dataDistrict: any) =>
            dataDistrict?.full_name ===
            dataCompany?.companyLocation?.district?.fullName,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDistricts, languageRedux]);

  useEffect(() => {
    if (dataWards && !selectedWard) {
      setSelectedWard(
        dataWards?.find(
          (dataWard: any) =>
            dataWard?.full_name === dataCompany?.companyLocation?.fullName,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWards, languageRedux]);

  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllLocation(
        languageRedux === 1 ? "vi" : "en"
      );

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
      if (
        dataCompany?.companyLocation?.district?.province?.id &&
        dataDistricts === null
      ) {
        const districts = await locationApi.getDistrictsById(
          dataCompany?.companyLocation?.district?.province?.id,
          languageRedux === 1 ? "vi" : "en",
        );

        if (districts) {
          setDataDistrict(districts?.data);
        }
      } else {
        if (selectedProvince) {
          const districts = await locationApi.getDistrictsById(
            selectedProvince?.id,
            languageRedux === 1 ? "vi" : "en",
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
          dataCompany?.companyLocation?.district?.id,
          languageRedux === 1 ? "vi" : "en",
        );

        if (allward) {
          setDataWard(allward?.data);
        }
      } else {
        if (selectedDistrict) {
          const allward = await locationApi.getWardsId(
            selectedDistrict?.id,
            languageRedux === 1 ? "vi" : "en",
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
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
  };

  const handleChangeWardId = (event: any, value: any) => {
    setSelectedWard(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyLocation: {
        id: value.id,
      },
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
            {
              languageRedux === 1 ?
                company.city :
                companyEn.city
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>

          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.province_fullName || ''}
            value={selectedProvince || null}
            // onChange={handleProvinceChange}
            onChange={(event: any, newValue: any | null) => {
              handleProvinceChange(event, newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  languageRedux === 1 ?
                    company.place_city :
                    companyEn.place_city
                }
                size="small"
                value={selectedProvince?.province_fullName}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.province_fullName === value.province_fullName;
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
            {
              languageRedux === 1 ?
                company.district :
                companyEn.district
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistricts ? dataDistricts : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            renderInput={(params: any) => (
              <TextField {...params} placeholder={
                languageRedux === 1 ?
                  company.place_district :
                  companyEn.place_district
              } size="small" />
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
            {
              languageRedux === 1 ?
                company.ward :
                companyEn.ward
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWards ? dataWards : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            renderInput={(params) => (
              <TextField {...params} placeholder={
                languageRedux === 1 ?
                  company.place_ward :
                  companyEn.place_ward
              } size="small" />
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
            {
              languageRedux === 1 ?
                company.address :
                companyEn.address
            }{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={dataCompany?.address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '8px' }}
            placeholder={
              languageRedux === 1 ?
                company.place_address :
                companyEn.place_address
            }
          />
        </div>
      </div>
    </div>
  );
});

export default memo(EditAddressCompany);
