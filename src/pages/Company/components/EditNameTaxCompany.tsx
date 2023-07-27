import React, { useState, memo } from 'react'
// import component UI
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'


const styleLabel = {
    fontWeight: 700,
    color: '#000000',
}

interface IEditNameFaxCompany {
    setDataCompany: any
    dataCompany: any
}

const EditNameFaxCompany: React.FC<IEditNameFaxCompany> = (props) => {
    const { dataCompany, setDataCompany } = props

    const handleEditCompanyFax = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target
        setDataCompany((preValue: any) => ({
            ...preValue,
            tax: value,
        }))
    }

    const handleEditCompanyName = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target
        setDataCompany((preValue: any) => ({
            ...preValue,
            company_name: value,
        }))
    }

    return (
        <div className="edit-name-tax-company-container">
            <div className="edit-name-company">
                <Typography
                    sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="editCompany"
                >
                    Tên công ty
                </Typography>
                <TextField
                    type="text"
                    id="editCompany"
                    name="title"
                    value={dataCompany?.name}
                    onChange={handleEditCompanyName}
                    size="small"
                    sx={{ width: '100%', marginTop: '8px' }}
                    placeholder="Nhập tên công ty"
                //   error={titleError} // Đánh dấu lỗi
                />
            </div>
            <div className="edit-tax-company">
                <Typography
                    sx={styleLabel}
                    variant="body1"
                    component="label"
                    htmlFor="editJob"
                >
                    Mã số thuế <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                    type="text"
                    id="editJob"
                    name="title"
                    value={dataCompany?.taxCode}
                    onChange={handleEditCompanyFax}
                    size="small"
                    sx={{ width: '100%', marginTop: '8px' }}
                    placeholder="Nhập mã số thuế"
                //   error={titleError} // Đánh dấu lỗi
                />
            </div>
        </div>
    )
}

export default memo(EditNameFaxCompany)
