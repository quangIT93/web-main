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

const EditFieldScaleCompany: React.FC<IEditPostAddress> = memo((props) => {
    const { setDataCompany, dataCompany } = props;
    const [selectedProvince, setSelectedProvince] = useState<any>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

    const dataProvinces = [
        {
            id: 1,
            name: 'IT'
        },
        {
            id: 2,
            name: 'Marketing'
        },
        {
            id: 3,
            name: 'Shop'
        },
        {
            id: 4,
            name: 'Khác'
        },
    ]

    const scales = [
        {
            id: 1,
            name: 'To'
        },
        {
            id: 2,
            name: 'Vừa'
        },
        {
            id: 3,
            name: 'Nhỏ'
        },
    ]

    const handleProvinceChange = (event: any, value: any) => {
        setSelectedDistrict(null);
        setSelectedProvince(value);
    };

    const handleDistrictChange = (event: any, value: any) => {
        setSelectedDistrict(value);
    };


    return (
        <div className="edit-field-scale-company-container">
            <div className="edit-field-company">
                <Typography
                    sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="addressTitle"
                >
                    Lĩnh vực hoạt động <span style={{ color: 'red' }}>*</span>
                </Typography>

                <Autocomplete
                    options={dataProvinces ? dataProvinces : []}
                    getOptionLabel={(option: any) => option?.name || ''}
                    value={selectedProvince || null}
                    onChange={handleProvinceChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Chọn lĩnh vực hoạt động"
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

            <div className="edit-scale-company">
                <Typography
                    sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="jobTitle"
                >
                    Quy mô công ty <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Autocomplete
                    options={dataProvinces ? dataProvinces : []}
                    getOptionLabel={(option: any) => option?.name || ''}
                    value={selectedProvince || null}
                    onChange={handleProvinceChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Chọn quy mô công ty"
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
        </div >
    );
});

export default memo(EditFieldScaleCompany);
