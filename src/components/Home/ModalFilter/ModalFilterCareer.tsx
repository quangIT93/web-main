import React from 'react'

// import component
import { ChoosesCarreer, WrapChooseLocation } from '../../Navbar/Css'
import CareerFilterSubnav from '../../Navbar/components/CareerFilterSubnav'
// import icon
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CloseIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'

interface PropsModalFilterCareer {
  setCareer: (value: string[]) => void
  career: string[]
  openCareer: boolean
  handleClickArrowCarreer: () => void
}

const ModalFilterCareer: React.FC<PropsModalFilterCareer> = (props) => {
  const { openCareer, setCareer, career, handleClickArrowCarreer } = props

  return (
    <ChoosesCarreer>
      <WrapChooseLocation onClick={handleClickArrowCarreer}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            overflowX: 'hidden',
          }}
        >
          <BusinessCenterOutlinedIcon sx={{ marginRight: '8px' }} />
          {
            career.length === 0 ? (
              <span
                style={{
                  padding: '4px 8px',
                }}
              >
                Chọn ngành nghề
              </span>
            ) : career.length <= 2 ? (
              career.map((v, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 8px',
                    background: '#ccc',
                    borderRadius: '12px',
                    // maxWidth: '120px',
                    // minWidth: '90px',
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
              ))
            ) : (
              <>
                {career.slice(0, 2).map((v, i) => (
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
                    borderRadius: '12px',
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
            )

            // `${position[0]} - ${position[1]} - ${position[2]}`
          }
        </div>

        {openCareer ? (
          <KeyboardArrowDownOutlinedIcon />
        ) : (
          <KeyboardArrowUpOutlinedIcon />
        )}
      </WrapChooseLocation>

      <CareerFilterSubnav setCareer={setCareer} openCareer={openCareer} />
    </ChoosesCarreer>
  )
}

export default ModalFilterCareer
