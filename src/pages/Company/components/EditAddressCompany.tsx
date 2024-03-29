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
import languageApi from 'api/languageApi';
// import { StringArraySupportOption } from 'prettier';
const styleLabel = {
  fontWeight: 700,
  color: '#000000',
};

interface IEditPostAddress {
  setDataCompany: any;
  dataCompany: any;
  is_profile: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  fillProvince: any;
  fillDistrict: any;
  fillWard: any;
  setFillProvince: React.Dispatch<React.SetStateAction<any>>;
  setFillDistrict: React.Dispatch<React.SetStateAction<any>>;
  setFillWard: React.Dispatch<React.SetStateAction<any>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAddressCompany: React.FC<IEditPostAddress> = memo((props) => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const {
    setDataCompany,
    dataCompany,
    is_profile,
    setUnsavedChanges,
    setFillProvince,
    setFillDistrict,
    setFillWard,
    setIsValid,
  } = props;

  // const [dataProvinces, setDataProvinces] = useState<any>(null);
  const [dataDistricts, setDataDistrict] = useState<any>(null);
  const [dataWards, setDataWard] = useState<any>(null);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const dataProvinces = useSelector(
    (state: RootState) => state.dataLocation.data,
  );
  // console.log('fillProvince', props.fillProvince);
  // console.log('fillDistrict', props.fillDistrict);

  // const [language, setLanguageState] = React.useState<any>();

  // const getlanguageApi = async () => {
  //   try {
  //     const result = await languageApi.getLanguage(
  //       languageRedux === 1 ? "vi" : "en"
  //     );
  //     if (result) {
  //       setLanguageState(result.data);
  //       // setUser(result);
  //     }
  //   } catch (error) {
  //     // setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   getlanguageApi()
  // }, [languageRedux])

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

  // const getAllProvinces = async () => {
  //   try {
  //     const allLocation = await locationApi.getAllLocation(
  //        languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
  //     );

  //     if (allLocation) {
  //       setDataProvinces(allLocation?.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (
        dataCompany?.companyLocation?.district?.province?.id &&
        dataDistricts === null
      ) {
        const districts = await locationApi.getDistrictsById(
          dataCompany?.companyLocation?.district?.province?.id,
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        if (districts) {
          setDataDistrict(districts?.data);
        }
      } else {
        if (selectedProvince) {
          const districts = await locationApi.getDistrictsById(
            selectedProvince?.province_id,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
          languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
        );

        if (allward) {
          setDataWard(allward?.data);
        }
      } else {
        if (selectedDistrict) {
          const allward = await locationApi.getWardsId(
            selectedDistrict?.id,
            languageRedux === 3 ? 'ko' : languageRedux === 2 ? 'en' : 'vi',
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
    setUnsavedChanges(true);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedProvince(value);
    setFillDistrict(null);
    setFillWard(null);
    setFillProvince(value);
    setDataWard([]);
    setIsValid(false);
  };

  const handleDistrictChange = (event: any, value: any) => {
    setUnsavedChanges(true);
    setSelectedDistrict(value);
    setSelectedWard(null);
    setFillWard(null);
    setFillDistrict(value);
    setIsValid(false);
  };

  const handleChangeWardId = (event: any, value: any) => {
    setUnsavedChanges(true);
    setSelectedWard(value);
    setFillWard(value);
    setDataCompany((preValue: any) => ({
      ...preValue,
      companyLocation: {
        id: value ? value.id : '',
      },
    }));
    setIsValid(false);
  };

  const handleChangeAddress = (e: any) => {
    setDataCompany((preValue: any) => ({
      ...preValue,
      address: e.target?.value,
    }));
    setIsValid(false);
  };

  return (
    <div className="edit-address-company-container modal-person editCompany">
      <div className="edit-address-company">
        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="addressTitle"
          >
            {languageRedux === 1
              ? 'Thành phố'
              : languageRedux === 2
                ? 'City'
                : '도시'} <span style={{ color: 'red' }}>*</span>
          </Typography>

          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.province_fullName || ''}
            value={selectedProvince || null}
            // onChange={handleProvinceChange}
            onChange={(event: any, newValue: any | null) => {
              handleProvinceChange(event, newValue);
            }}
            id="company_city"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1
                  ? 'Thành phố'
                  : languageRedux === 2
                    ? 'City'
                    : '도시'}
                size="small"
                value={selectedProvince?.province_fullName}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.province_fullName === value.province_fullName;
            }}
            style={{ marginTop: '8px' }}
          />
          <div className="wrap-noti_input">
            {!selectedProvince ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng chọn Thành phố'
                  : languageRedux === 2
                    ? 'Please select City'
                    : languageRedux === 3 && '도시를 선택하세요'}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1
              ? 'Quận'
              : languageRedux === 2
                ? 'District'
                : '군'}{' '}
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataDistricts ? dataDistricts : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            id="company_district"
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1
                  ? 'Quận'
                  : languageRedux === 2
                    ? 'District'
                    : '군'}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{ marginTop: '8px' }}
          />
          <div className="wrap-noti_input">
            {!selectedDistrict ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng chọn quận'
                  : languageRedux === 2
                    ? 'Please select district'
                    : languageRedux === 3 && '지역을 선택해주세요'}
              </span>
            ) : (
              <></>
            )}
          </div>
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
            {languageRedux === 1
              ? 'Phường/Xã'
              : languageRedux === 2
                ? 'Ward'
                : '동/읍'} <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Autocomplete
            disabled={is_profile ? true : false}
            options={dataWards ? dataWards : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedWard || null}
            onChange={handleChangeWardId}
            id="company_ward"
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={languageRedux === 1
                  ? 'Phường/Xã'
                  : languageRedux === 2
                    ? 'Ward'
                    : '동/읍'}
                size="small"
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.full_name === value.full_name;
            }}
            style={{ marginTop: '8px' }}
          />
          <div className="wrap-noti_input">
            {!selectedWard ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng chọn phường'
                  : languageRedux === 2
                    ? 'Please select award'
                    : languageRedux === 3 && '병동을 선택해주세요'}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="edit-titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            {languageRedux === 1
              ? 'Địa chỉ'
              : languageRedux === 2
                ? 'Address'
                : '주소'} <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            type="text"
            id="company_address"
            name="title"
            value={dataCompany?.address}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '8px' }}
            placeholder={languageRedux === 1
              ? 'Địa chỉ'
              : languageRedux === 2
                ? 'Address'
                : '주소'}
            disabled={is_profile ? true : false}
          />
          <div className="wrap-noti_input">
            {dataCompany && dataCompany?.address?.length === 0 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Vui lòng nhập địa chỉ'
                  : languageRedux === 2
                    ? 'Please enter address'
                    : languageRedux === 3 && '주소를 입력해주세요'}
              </span>
            ) : dataCompany && dataCompany?.address?.length <= 10 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Độ dài địa chỉ phải nhiều hơn 10 ký tự'
                  : languageRedux === 2
                    ? 'Address length must be more than 10 characters'
                    : languageRedux === 3 &&
                    '주소 길이는 10자 이상이어야 합니다.'}
              </span>
            ) : dataCompany && dataCompany?.address?.length > 255 ? (
              <span className="helper-text">
                {languageRedux === 1
                  ? 'Độ dài địa chỉ không được vượt quá 255 ký tự'
                  : languageRedux === 2
                    ? 'Address length cannot exceed 255 characters'
                    : languageRedux === 3 &&
                    '주소 길이는 255자를 초과할 수 없습니다.'}
              </span>
            ) : (
              <></>
            )}
            <span className="number-text">
              {`${dataCompany ? dataCompany?.address?.length : '0'}/255`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(EditAddressCompany);
