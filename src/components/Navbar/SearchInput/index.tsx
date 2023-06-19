import React, { useState } from 'react'
import { Select } from 'antd'
import jsonp from 'fetch-jsonp'
import qs from 'qs'
import type { SelectProps } from 'antd'

let timeout: ReturnType<typeof setTimeout> | null
let currentValue: string

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  const fake = async () => {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    })
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then((response: any) => response.json())
      .then((d: any) => {
        if (currentValue === value) {
          const { result } = d

          console.log('d', d)
          console.log('result', result)
          const data = result.map((item: any) => ({
            value: item[0],
            text: item[0],
          }))
          console.log('data1111', data)
          callback(data)
        }
      })
  }
  if (value) {
    timeout = setTimeout(fake, 300)
  } else {
    callback([])
  }
}

const SearchInput = () => {
  const [data, setData] = useState<SelectProps['options']>([])
  const [value, setValue] = useState<string>()

  console.log('data', data)
  console.log('value', value)

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData)
  }

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }
  return (
    <Select
      showSearch
      value={value}
      placeholder="input search text"
      style={{ width: '200px' }}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  )
}

export default SearchInput
