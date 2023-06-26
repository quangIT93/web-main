import React from 'react'

import { Collapse, Box, Slider } from '@mui/material'

interface PropsSalaryFilterSubnav {
  openSalary: boolean
  setSalary: (value: number[]) => void
}

const SalaryFilterSubnav: React.FC<PropsSalaryFilterSubnav> = (props) => {
  const { setSalary, openSalary } = props
  const [value, setValue] = React.useState<number[]>([0, 100000000])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  // event change salary
  function valuetext(value: number) {
    return `${value}`
  }

  function handleClickAddSalary() {
    // setOpenSalary(false)

    setSalary(value)
  }
  return (
    <Collapse
      in={openSalary}
      timeout="auto"
      unmountOnExit
      sx={{
        background: '#fff',
        minWidth: '100%',
        overflow: 'hidden',
      }}
      className="subnav-chooses-__carreer"
    >
      {/* <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingTop: '12px',
        }}
      >
        <div className="rangeSalary" style={{ display: 'flex' }}>
          <p style={{ flex: '3', textAlign: 'center' }}>
            Lương từ
            <span style={{ color: 'black', fontWeight: '600' }}>
              {' '}
              {value[0].toLocaleString()}{' '}
            </span>
            đến
            <span style={{ color: 'black', fontWeight: '600' }}>
              {' '}
              {value[1].toLocaleString()}{' '}
            </span>
          </p>
          <div className="wrapRadiSalary" style={{ flex: '1' }}>
            <input type="radio" id="html" />
            <label htmlFor="html" style={{ paddingLeft: '8px' }}>
              VND
            </label>
            <input type="radio" id="css" />
            <label htmlFor="css" style={{ paddingLeft: '8px' }}>
              USD
            </label>
          </div>
        </div>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={100000000}
          step={1000000}
          sx={{ width: '50%', margin: '0 auto' }}
        />
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
            onClick={handleClickAddSalary}
          >
            Áp dụng
          </button>
        </div>
      </Box> */}
    </Collapse>
  )
}

export default SalaryFilterSubnav
