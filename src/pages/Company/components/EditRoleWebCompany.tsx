import React, { useState, useEffect, useCallback, memo } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// api
import locationApi from '../../../api/locationApi';

import apiCompany from 'api/apiCompany';

import { StringArraySupportOption } from 'prettier';
const styleLabel = {
    fontWeight: 700,
    color: '#000000',
};

interface IEditPostAddress {
    setDataCompany: any
    dataCompany: any
}

const EditRoleWebCompany: React.FC<IEditPostAddress> = memo((props) => {
    const { setDataCompany, dataCompany } = props;

    const [dataRoles, setDataRoles] = useState<any>(null);
    const [selectedRole, setSelectedRole] = useState<any>(null);

    useEffect(() => {
        if (dataRoles && !selectedRole) {
            setSelectedRole(
                dataRoles?.find(
                    (dataRole: any) =>
                        dataRole?.nameText === dataCompany?.companyRole?.name,
                ),
            );
        }

    }, []);

    console.log(selectedRole);


    const getRoles = async () => {
        try {
            const roles = await apiCompany.getAllRolesCompany();

            if (roles) {
                setDataRoles(roles);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRoles()
    }, [])

    const dataRoles2 = [
        {
            id: 1,
            name: 'Chủ sở hữu doanh nghiệp'
        },
        {
            id: 2,
            name: 'Nhân viên của doanh nghiệp'
        },
        {
            id: 3,
            name: 'Nhà tuyển dụng của doanh nghiệp'
        },
        {
            id: 4,
            name: 'Khác'
        },
    ]

    console.log("dataRoles", dataRoles);

    const handleEditCompanyRole = (event: any, value: any) => {
        setDataCompany((preValue: any) => ({
            ...preValue,
            role: value,
        }))
    }

    const handleEditCompanyWeb = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target
        setDataCompany((preValue: any) => ({
            ...preValue,
            web: value,
        }))
    }


    return (
        <div className="edit-role-web-company-container">
            <div className="edit-role-company">
                <Typography
                    sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="addressTitle"
                >
                    Vai trò của bạn trong doanh nghiệp <span style={{ color: 'red' }}>*</span>
                </Typography>

                <Autocomplete
                    options={dataRoles ? dataRoles : []}
                    getOptionLabel={(option: any) => option?.nameText || ''}
                    value={selectedRole || null}
                    onChange={handleEditCompanyRole}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Chọn vai trò của bạn"
                            size="small"
                        // value={dataCompany?.companyRole?.id}
                        />
                    )}
                    // isOptionEqualToValue={(option, value) => {
                    //     return option.name === value.name;
                    // }}
                    style={{ marginTop: '8px' }}
                />
            </div>

            <div className="edit-web-company">
                <Typography
                    sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="jobTitle"
                >
                    Website
                </Typography>
                <TextField
                    type="text"
                    id="editJob"
                    name="title"
                    value={dataCompany?.website}
                    onChange={handleEditCompanyWeb}
                    size="small"
                    sx={{ width: '100%', marginTop: '8px' }}
                    placeholder="http://"
                //   error={titleError} // Đánh dấu lỗi
                />
            </div>
        </div>
    );
});

export default memo(EditRoleWebCompany);
