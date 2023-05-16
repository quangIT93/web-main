import React, { useState } from 'react'

import { Collapse } from '@mui/material'

// import data
import { dataLocation, locationProp } from '../data'

// import component

interface PropsLocationFilterSubnav {
  openLocation: boolean
  setPosition: (value: string[]) => void
}

const PositionFilterSubnav: React.FC<PropsLocationFilterSubnav> = (props) => {
  const { openLocation, setPosition } = props

  const [checkedSaveCheckboxPositon, setCheckedSaveCheckboxPositon] = useState<
    string[]
  >([])

  const handleOnChangeCheckboxPosition = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValue = e.target.value

    // Nếu phần tử đã có trong mảng, loại bỏ nó
    if (checkedSaveCheckboxPositon.includes(currentValue)) {
      setCheckedSaveCheckboxPositon((prevState: string[]) =>
        prevState.filter((value: string) => value !== currentValue)
      )
    }
    // Nếu phần tử chưa có trong mảng, thêm vào
    else {
      setCheckedSaveCheckboxPositon((prevState: string[]) => [
        ...prevState,
        currentValue,
      ])
    }
  }

  // áp dụng chọn địa điểm
  const handleClickCheckboxPosition = () => {
    setPosition(checkedSaveCheckboxPositon)
  }

  return (
    <Collapse
      in={openLocation}
      timeout="auto"
      unmountOnExit
      sx={{
        position: 'absolute',
        top: '100%',
        background: '#fff',
        // padding: '12px 24px',
        marginTop: '24px',
        minWidth: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '1px 1px 5px #000',
        height: '400px',
        zIndex: 1,
      }}
      className="subnav-chooses__carreer"
      onClick={(e: any) => e.stopPropagation()}
    >
      <h3 style={{ padding: '12px 24px', textAlign: 'center' }}>Địa điểm</h3>

      <ul
        className="list-locations"
        style={{
          height: '300px',
          borderTop: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          overflowY: 'scroll',
          margin: '0 24px',
        }}
      >
        {dataLocation.map((location: locationProp, index1) => (
          <li
            key={index1}
            style={{
              padding: '4px 0 24px',
              listStyle: 'none',
            }}
            className="list-location"
          >
            <h4
              style={{
                padding: '6px 0',
                borderBottom: '1px solid #ccc',
                color: '#1b87f5 ',
              }}
            >
              {location.city}
            </h4>
            {location.district.map((name: string, index2) => (
              <label
                key={index2}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px',
                  borderBottom: '1px solid #ccc',
                }}
                htmlFor={name}
              >
                {name}
                <input
                  type="checkbox"
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '4px',
                  }}
                  id={name}
                  value={name}
                  onChange={(e) => handleOnChangeCheckboxPosition(index1, e)}
                  checked={
                    checkedSaveCheckboxPositon.includes(name) ? true : false
                  }
                />
              </label>
            ))}
          </li>
        ))}
      </ul>
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
            border: 'none',
            color: 'white',
          }}
          onClick={handleClickCheckboxPosition}
        >
          Áp dụng
        </button>
      </div>
    </Collapse>
  )
}

export default PositionFilterSubnav
