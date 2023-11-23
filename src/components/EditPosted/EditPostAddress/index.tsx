import React, { useState, useEffect, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
import locationApi from '../../../api/locationApi';

import './style.scss';
import { post } from 'validations/lang/vi/post';
import { postEn } from 'validations/lang/en/post';
// import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 600,
  color: '#000000',
};

interface IEditPostAddress {
  dataPostById: any;
  setEditDataPosted: any;
  editDataPosted: any;
  language: any;
  languageRedux: any;
  fillProvince: any;
  fillDistrict: any;
  setFillProvince: React.Dispatch<React.SetStateAction<any>>;
  setFillDistrict: React.Dispatch<React.SetStateAction<any>>;
  setFillWard: React.Dispatch<React.SetStateAction<any>>;
}

const EditPostAddress: React.FC<IEditPostAddress> = memo((props) => {
  const {
    dataPostById,
    setEditDataPosted,
    editDataPosted,
    language,
    languageRedux,
    setFillProvince,
    setFillDistrict,
    setFillWard,
  } = props;

  const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistricts, setDataDistrict] = useState<any>(null);
  const [dataWards, setDataWard] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);

  // console.log("dataProvinces", dataPostById);

  useEffect(() => {
    if (dataProvinces && !selectedProvince) {
      setSelectedProvince(
        dataProvinces?.find(
          (dataProvince: any) =>
            dataProvince?.province_fullName === dataPostById?.province,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProvinces]);

  useEffect(() => {
    if (dataDistricts && !selectedDistrict) {
      setSelectedDistrict(
        dataDistricts.find(
          (dataDistrict: any) =>
            dataDistrict.full_name === dataPostById.district,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDistricts]);

  useEffect(() => {
    if (dataWards && !selectedWard) {
      setSelectedWard(
        dataWards.find(
          (dataWard: any) => dataWard.full_name === dataPostById.ward,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWards]);

  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllLocation(
        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
      );

      if (allLocation) {
        setDataProvinces(allLocation.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (dataPostById && dataDistricts === null) {
        const districts = await locationApi.getDistrictsById(
          dataPostById?.province_id,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        if (districts) {
          setDataDistrict(districts.data);
        }
      } else {
        if (selectedProvince) {
          const districts = await locationApi.getDistrictsById(
            selectedProvince?.province_id,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (districts) {
            setDataDistrict(districts.data);
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
          dataPostById.district_id,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );
        if (allward) {
          setDataWard(allward.data);
        }
      } else {
        if (selectedDistrict) {
          const allward = await locationApi.getWardsId(
            selectedDistrict?.id,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
          );
          if (allward) {
            setDataWard(allward.data);
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
    setFillDistrict(null);
    setFillWard(null);
    setFillProvince(value);
    setDataWard([]);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
    setFillWard(null);
    setFillDistrict(value);
  };

  const handleChangeWardId = (event: any, value: any) => {
    setSelectedWard(value);
    setFillWard(value);
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      ward_id: value?.id,
    }));
  };

  const handleChangeAddress = (e: any) => {
    setEditDataPosted((preValue: any) => ({
      ...preValue,
      address: e.target.value,
    }));
  };

  return (
    <div className="edit-post_address">
      <div className="edit-post_addressTop">
        <div className="edit-post_titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="addressTitle"
          >
            {language?.post_page.city} <span style={{ color: 'red' }}>*</span>
          </Typography>

          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.province_fullName || ''}
            value={selectedProvince || null}
            onChange={handleProvinceChange}
            id="edit_post_place_city"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={language?.post_page.place_city}
                size="small"
                value={selectedProvince?.province_fullName}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.province_fullName === value.province_fullName;
            }}
            style={{ marginTop: '0.5rem' }}
          />
        </div>

        <div className="edit-post_titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {language?.post_page.district}{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataDistricts ? dataDistricts : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            id="edit_post_place_district"
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder={language?.post_page.place_district}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{ marginTop: '0.5rem' }}
          />
        </div>
      </div>
      <div className="edit-post_addressBottom">
        <div className="edit-post_titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {language?.post_page.ward} <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            options={dataWards ? dataWards : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            id="edit_post_place_ward"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={language?.post_page.place_ward}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{ marginTop: '0.5rem' }}
          />
        </div>

        <div className="edit-post_titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {language?.post_page.address}{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="edit_post_place_address"
            name="title"
            value={editDataPosted?.address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '0.5rem' }}
            placeholder={language?.post_page.place_address}
          />
        </div>
      </div>
    </div>
  );
});

export default memo(EditPostAddress);
