import React, { useState } from 'react'

import { ChoosesCarreer, WrapChooseLocation } from '../../Navbar/Css'

// import component Material UI
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

// import component
import ModalFilterHistory from './ModalFilterHistory'
import ModalFilterCareer from './ModalFilterCareer'
import ModalFilterSalary from './ModalFilterSalary'
import SalaryFilterSubnav from '#components/Navbar/components/SalaryFilterSubnav'
// import scss
import './style.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borer: 'none',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '20px',
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const ChildModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

interface PropsModalFilter {
  openModalFilter: boolean
  setOpenModalFilter: React.Dispatch<React.SetStateAction<boolean>>
  openLocation: boolean
  setOpenLocation: React.Dispatch<React.SetStateAction<boolean>>
  setPosition: React.Dispatch<React.SetStateAction<string[]>>
  handleClickArrowLocation: (e: React.MouseEvent<HTMLElement>) => void
  position: string[]
  windowWidth: boolean
  openCareer: boolean
  setCareer: (value: string[]) => void
  career: string[]
  handleClickArrowCarreer: () => void
  salary: number[]
  setSalary: React.Dispatch<React.SetStateAction<Number[]>>
}

const ModalFilter: React.FC<PropsModalFilter> = (props) => {
  const {
    openModalFilter,
    setOpenModalFilter,
    openLocation,
    setOpenLocation,
    setPosition,
    handleClickArrowLocation,
    position,
    windowWidth,
    setCareer,
    career,
    salary,
    setSalary,
  } = props

  const [openFilterLocation, setOpenFilterLocation] = useState(false)
  const [checked, setChecked] = React.useState([true, false])
  const [openCareer, setOpenCareer] = React.useState(false)
  const [openSalary, setOpenSalary] = React.useState(false)
  const [selectedValue, setSelectedValue] = useState('month')

  const handleClickShowFilterLocation = () => {
    if (!openFilterLocation) {
      setOpenFilterLocation(true)
      setOpenCareer(false)
    } else {
      setOpenFilterLocation(false)
    }
  }

  const handleClickArrowCarreer = () => {
    if (!openCareer) {
      setOpenCareer(true)
      setOpenFilterLocation(false)
    } else {
      setOpenCareer(false)
    }
  }

  const handleClose = () => {
    setOpenModalFilter(false)
  }

  // handle Checked
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]])
  }

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked])
  }

  //handle

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <div>
      <Modal
        open={openModalFilter}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ borderRadius: '20px' }}
      >
        <Box sx={{ ...style, width: 680 }}>
          <h2 id="parent-modal-title" className="filter-name">
            Bộ lọc
          </h2>
          <div className="choose-filter">
            <div className="choose-filter_top">
              <ModalFilterHistory
                setPosition={setPosition}
                position={position}
                windowWidth={windowWidth}
                handleClickShowFilterLocation={handleClickShowFilterLocation}
                openFilterLocation={openFilterLocation}
              />
              <ModalFilterCareer
                openCareer={openCareer}
                setCareer={setCareer}
                career={career}
                handleClickArrowCarreer={handleClickArrowCarreer}
              />
            </div>
            <div className="choose-filter_bottom">
              <ModalFilterSalary setSalary={setSalary} openSalary={true} />
            </div>
          </div>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Trả lương theo
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedValue}
              onChange={handleChange}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <FormControlLabel value="time" control={<Radio />} label="Giờ" />
              <FormControlLabel value="day" control={<Radio />} label="Ngày" />
              <FormControlLabel value="week" control={<Radio />} label="Tuần" />
              <FormControlLabel
                value="month"
                control={<Radio />}
                label="Tháng"
              />
              <FormControlLabel
                value="work"
                control={<Radio />}
                label="Công việc"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              component="legend"
            >
              Thời gian làm việc
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="LimitedTime"
                control={<Radio id="limited-time-radio" />}
                label="Có giới hạn thời gian"
                htmlFor="limited-time-radio"
              />
              <FormControlLabel
                value="UnlimitedTime"
                control={<Radio id="limited-time-radio1" />}
                label="Không giới hạn thời gian"
                htmlFor="limited-time-radio1"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel
              label="Làm việc cuối tuần"
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label="Làm việc từ xa"
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '0px 24px',
              padding: '24px 0',
              gap: '10px',
              flexDirection: 'row',
            }}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                width: '108px',
                height: '48px',
                borderRadius: '10px',
                outline: 'none',
                border: 'none',
              }}
            >
              Huỷ
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                width: '108px',
                height: '48px',
                background: '#0D99FF',
                borderRadius: '10px',
                outline: 'none',
                color: 'white',
                border: 'none',
              }}
              // onClick={handleClickAddSalary}
            >
              Áp dụng
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalFilter
