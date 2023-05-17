import React, { useState } from 'react'

// import component
import { ChoosesCarreer, WrapChooseLocation } from '../../Navbar/Css'
import PositionFilterSubnav from '../../Navbar/components/PositionFilterSubnav'
// import KeyboardArrowUpOutlinedIcon from '../../Navbar/components/PositionFilterSubnav'

// import icon
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

interface PropsModalFilter {
  setPosition: React.Dispatch<React.SetStateAction<string[]>>
  position: string[]
  windowWidth: boolean
  handleClickShowFilterLocation: () => void
  openFilterLocation: boolean
}

const ModalFilterHistory: React.FC<PropsModalFilter> = (props) => {
  const {
    setPosition,
    position,
    windowWidth,
    handleClickShowFilterLocation,
    openFilterLocation,
  } = props

  return (
    <ChoosesCarreer>
      <WrapChooseLocation
        onClick={handleClickShowFilterLocation}
        className="choose-locations"
      >
        <div
          style={{
            // width: '260px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflowX: 'hidden',
          }}
        >
          <LocationOnOutlinedIcon
            sx={{ marginRight: '8px', overflow: 'hidden' }}
          />
          {position.length === 0 ? (
            <span
              style={{
                padding: '4px 8px',
              }}
            >
              Chọn địa điểm
            </span>
          ) : position.length <= 2 ? (
            position.map((v, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 8px',
                  background: '#ccc',
                  borderRadius: '12px',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  alignItems: 'center',
                  marginRight: '4px',
                }}
              >
                {`${v}`}
                <CloseIcon sx={{ fontSize: '20px' }} />
              </span>
            ))
          ) : (
            <>
              {position.slice(0, windowWidth ? 1 : 2).map((v, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 8px',
                    background: '#ccc',
                    borderRadius: '12px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    alignItems: 'center',
                    marginRight: '12px',
                  }}
                >
                  {`${v}`}
                  <CloseIcon sx={{ fontSize: '20px' }} />
                </span>
              ))}
              <span
                style={{
                  padding: '2px',
                  background: '#ccc',
                  borderRadius: '50%',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  alignItems: 'center',
                  marginRight: '12px',
                }}
              >
                <MoreHorizIcon />
              </span>
            </>
          )}
        </div>
        {openFilterLocation ? (
          <KeyboardArrowDownOutlinedIcon />
        ) : (
          <KeyboardArrowUpOutlinedIcon />
        )}
      </WrapChooseLocation>
      <PositionFilterSubnav
        openLocation={openFilterLocation}
        setPosition={setPosition}
      />
    </ChoosesCarreer>
  )
}

export default ModalFilterHistory
