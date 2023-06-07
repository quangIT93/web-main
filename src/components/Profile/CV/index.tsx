import React, { useState } from 'react'
// @ts-ignore

import { Button, Space, Tooltip } from 'antd'
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';


import moment from 'moment'
import './style.scss'


interface Url_CV {
  url: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemInfoLeft: React.FC<Url_CV> = ({ url, open, setOpen }) => {

  return (

    <Space>
      <div style={{ backgroundColor: "#F1F0F0", padding: 10, borderRadius: 10, cursor: "pointer" }}
        onClick={() => {
          window.open('https://cnm1.s3.ap-southeast-1.amazonaws.com/N23_Poster_KLKTPM.pdf')
        }}
      >

        <Space>
          <p style={{ color: "#575757" }} >
            {url.substring(57)}
          </p>

          <FilePdfOutlined style={{ fontSize: 20, color: "#575757" }} />
        </Space>
      </div>
      <Tooltip placement="right" title={'Xoa CV'} style={{ fontSize: 5 }} >
        <DeleteOutlined onClick={() => {
          setOpen(true)
        }} className='icon-remove' />
      </Tooltip>

    </Space>

  )
}

export default ItemInfoLeft
