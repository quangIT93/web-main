import React, { useState } from 'react'
import { Collapse } from '@mui/material'

import { datacareer, careerProp } from '../data'

interface PropsLocationFilterSubnav {
  openCareer: boolean
  setCareer: (value: string[]) => void
}

const CareerFilterSubnav: React.FC<PropsLocationFilterSubnav> = (props) => {
  const { openCareer, setCareer } = props

  const [checkedSaveCheckboxCareer, setCheckedSaveCheckboxCareer] = useState<
    string[]
  >([])

  const handleOnChangeCheckboxCareer = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValue = e.target.value

    // Nếu phần tử đã có trong mảng, loại bỏ nó
    if (checkedSaveCheckboxCareer.includes(currentValue)) {
      setCheckedSaveCheckboxCareer((prevState: string[]) =>
        prevState.filter((value: string) => value !== currentValue)
      )
    }
    // Nếu phần tử chưa có trong mảng, thêm vào
    else {
      setCheckedSaveCheckboxCareer((prevState: string[]) => [
        ...prevState,
        currentValue,
      ])
    }
  }

  // áp dụng chọn ngành nghề
  const handleClickCheckboxCareer = () => {
    setCareer(checkedSaveCheckboxCareer)
  }

  return (
    <Collapse
      in={openCareer}
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
        {datacareer.map((careers: careerProp, index1) => (
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
              {careers.career}
            </h4>
            {careers.jobs.map((name: string, index2) => (
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
                  onChange={(e) => handleOnChangeCheckboxCareer(index1, e)}
                  checked={
                    checkedSaveCheckboxCareer.includes(name) ? true : false
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
          onClick={handleClickCheckboxCareer}
        >
          Áp dụng
        </button>
      </div>
    </Collapse>
  )
}

export default CareerFilterSubnav
