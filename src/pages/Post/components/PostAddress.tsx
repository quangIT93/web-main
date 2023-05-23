import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import FormValues from '../index'

// data
import { provinces, districts, wards } from '../data/data'

interface IPostAddress {
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedProvince: React.Dispatch<React.SetStateAction<string | null>>
  selectedDistrict: any
  selectedProvince: any
  setSelectedWard: any
  selectedWard: any
}
const PostAddress: React.FC<IPostAddress> = (props) => {
  const {
    setSelectedDistrict,
    setSelectedProvince,
    selectedDistrict,
    selectedProvince,
    setSelectedWard,
    selectedWard,
  } = props
  const styleLabel = {
    fontWeight: 600,
    color: '#000000',
  }

  const handleProvinceChange = (event: any, value: any) => {
    console.log(value)
    setSelectedDistrict(null)
    setSelectedProvince(value)
  }

  const handleDistrictChange = (event: any, value: any) => {
    console.log('handleDistrictChange', value)
    setSelectedDistrict(value)
  }

  const handleChangeAddress = (e: any) => {
    setSelectedWard(e.target.value)
    console.log('setSelectedWard', e.target.value)
  }
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
            Thành Phố *:
          </Typography>
          <Autocomplete
            options={provinces}
            getOptionLabel={(option) => option.name}
            value={selectedProvince}
            onChange={handleProvinceChange}
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
            Quận *:
          </Typography>
          <Autocomplete
            options={districts}
            getOptionLabel={(option) => option.full_name}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            renderInput={(params) => (
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
            Phường/Xã *:
          </Typography>
          <Autocomplete
            options={provinces}
            getOptionLabel={(option) => option.name}
            value={selectedProvince}
            onChange={handleProvinceChange}
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
            Địa chỉ *:
          </Typography>
          <TextField
            type="text"
            id="jobTitle"
            name="title"
            value={selectedWard}
            onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Tên đường, toà nhà, số nhà"
          />
        </div>
      </div>
    </div>
  )
}

export default PostAddress
