import React from 'react'
import { Collapse, Box, Slider } from '@mui/material'

interface PropsSalaryFilterSubnav {
  openSalary: boolean
  setSalary: (value: number[]) => void
}

const PostFilterSalary: React.FC<PropsSalaryFilterSubnav> = (props) => {
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
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '12px 0',
      }}
    >
      <h3
        style={{
          fontWeight: 600,
          fontSize: '1rem',
          lineHeight: '24px',
          marginBottom: '12px',
        }}
      >
        Mức lương:
      </h3>
      <div className="wrapRadiSalary" style={{}}>
        <input type="radio" id="html" style={{ marginLeft: '16px' }} />
        <label htmlFor="html" style={{ paddingLeft: '8px' }}>
          VND
        </label>
        <input type="radio" id="css" style={{ marginLeft: '16px' }} />
        <label htmlFor="css" style={{ paddingLeft: '8px' }}>
          USD
        </label>
      </div>
      <div
        className="rangeSalary"
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '12px 16px',
        }}
      >
        <p style={{ flex: '3' }}>
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
        sx={{ width: '80%', margin: '0 auto' }}
      />
    </Box>
  )
}

export default PostFilterSalary
