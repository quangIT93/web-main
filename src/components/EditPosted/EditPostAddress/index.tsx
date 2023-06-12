import React, { useState, useEffect, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// api
import locationApi from '../../../api/locationApi'

import './style.scss'
const styleLabel = {
  fontWeight: 600,
  color: '#000000',
}

interface IEditPostAddress {
  province: string
}

const EditPostAddress: React.FC<IEditPostAddress> = (props) => {
  const { province } = props

  const [dataProvinces, setDataProvinces] = useState<any>(null)
  const [dataDistrict, setDataDistrict] = useState<any>(null)
  const [dataWard, setDataWard] = useState<any>(null)
  const [selectedProvince, setSelectedProvince] = useState<any>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
  const [selectedWard, setSelectedWard] = useState<any>(null)

  useEffect(() => {
    if (dataProvinces && !selectedProvince) {
      setSelectedProvince(
        dataProvinces.find(
          (dataProvince: any) => dataProvince.name === province
        )
      )
    }
  }, [dataProvinces, province, selectedProvince])

  const getAllProvinces = async () => {
    try {
      const allLocation = await locationApi.getAllProvinces()

      if (allLocation) {
        setDataProvinces(allLocation.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get All locations by location id
  const getDataDistrict = async () => {
    try {
      if (selectedProvince) {
        const districts = await locationApi.getDistrictsById(
          selectedProvince.id
        )
        if (districts) {
          setDataDistrict(districts.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get All ward by ward id
  const getDataWard = async () => {
    try {
      if (selectedDistrict) {
        const allward = await locationApi.getWardsId(selectedDistrict.id, '')
        if (allward) {
          setDataWard(allward.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getAllProvinces()
    // getAllLocations()
    // delete param when back to page
  }, [])

  React.useEffect(() => {
    getDataDistrict()
    // delete param when back to page
  }, [selectedProvince])

  React.useEffect(() => {
    getDataWard()
    // delete param when back to page
  }, [selectedDistrict])

  const handleProvinceChange = (event: any, value: any) => {
    console.log('value', value)
    // setSelectedDistrict(null)
    // setSelectedWard(null)
    setSelectedProvince(value)
    // setDataWard([])
  }

  useCallback(() => {
    const handleDistrictChange = (event: any, value: any) => {
      setSelectedDistrict(value)
    }
  }, [])
  console.log('selectedProvince', selectedProvince)
  console.log('selectDistrict', selectedDistrict)
  console.log('dataProvinces', dataProvinces)
  console.log('province', province)
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
            Thành Phố *:
          </Typography>

          <Autocomplete
            options={dataProvinces ? dataProvinces : []}
            getOptionLabel={(option: any) => option?.name || ''}
            value={selectedProvince || null}
            onChange={handleProvinceChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Tỉnh/TP"
                size="small"
                value={selectedProvince?.name}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.name === value.name
            }}
          />
        </div>

        <div className="edit-post_titleAddress">
          <Typography
            sx={styleLabel}
            variant="body1"
            component="label"
            htmlFor="jobTitle"
          >
            Quận *:
          </Typography>
          <Autocomplete
            options={dataDistrict ? dataDistrict : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            value={selectedDistrict || null}
            onChange={handleDistrictChange}
            renderInput={(params: any) => (
              <TextField {...params} placeholder="Quận/Huyện" size="small" />
            )}
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
            Phường/Xã *:
          </Typography>
          <Autocomplete
            options={dataWard ? dataWard : []}
            getOptionLabel={(option: any) => option?.full_name || ''}
            // value={selectedWard || null}
            // onChange={handleChangeWardId}
            renderInput={(params) => (
              <TextField {...params} placeholder="Phường/Xã" size="small" />
            )}
          />
        </div>

        <div className="edit-post_titleAddress">
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
            // value={address}
            // onChange={handleChangeAddress}
            size="small"
            sx={{ width: '100%', marginTop: '4px' }}
            placeholder="Tên đường, toà nhà, số nhà"
          />
        </div>
      </div>
    </div>
  )
}

export default EditPostAddress
