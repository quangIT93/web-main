import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

import { ChoosesCarreer, WrapChooseLocation } from '../../Navbar/Css'

// import component
import PositionFilterSubnav from '../../Navbar/components/PositionFilterSubnav'
// import KeyboardArrowUpOutlinedIcon from '../../Navbar/components/PositionFilterSubnav'

// import icon
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

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
  } = props

  const handleClose = () => {
    setOpenModalFilter(false)
  }

  return (
    <div>
      <Modal
        open={openModalFilter}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Bộ lọc</h2>
          <ChoosesCarreer>
            <WrapChooseLocation
              onClick={handleClickArrowLocation}
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
              {openLocation ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </WrapChooseLocation>
            <PositionFilterSubnav
              openLocation={openLocation}
              setPosition={setPosition}
            />
          </ChoosesCarreer>
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  )
}

export default ModalFilter
