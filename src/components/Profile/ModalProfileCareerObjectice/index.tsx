import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { TreeSelect } from 'antd'
import Button from '@mui/material/Button'
import './style.scss'

// data
import categoriesApi from '../../../api/categoriesApi'

const { SHOW_PARENT } = TreeSelect

// const treeData = [
//   {
//     title: 'Node1',
//     value: '0-0',
//     key: '0-0',
//     children: [
//       {
//         title: 'Child Node1',
//         value: '0-0-0',
//         key: '0-0-0',
//       },
//     ],
//   },
//   {
//     title: 'Node2',
//     value: '0-1',
//     key: '0-1',
//     children: [
//       {
//         title: 'Child Node3',
//         value: '0-1-0',
//         key: '0-1-0',
//       },
//       {
//         title: 'Child Node4',
//         value: '0-1-1',
//         key: '0-1-1',
//       },
//       {
//         title: 'Child Node5',
//         value: '0-1-2',
//         key: '0-1-2',
//       },
//     ],
//   },
// ]

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
}

interface IModalProfileCareerObjectice {
  openModalCareerObjective: boolean
  setOpenModalCareerObjective: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalProfileCareerObjectice: React.FC<IModalProfileCareerObjectice> = (
  props
) => {
  const { openModalCareerObjective, setOpenModalCareerObjective } = props
  const [value, setValue] = useState(['354'])
  const [dataCategories, setDataCategories] = React.useState<any>(null)
  const [treeData, setTransformedData] = React.useState<any>(null)

  const getCategories = async () => {
    try {
      const result = await categoriesApi.getAllCategorise()
      if (result) {
        setDataCategories(result.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    getCategories()
  }, [])
  const onChange = (newValue: string[], selectedOptions: any[]) => {
    setValue(newValue)
  }

  console.log('dataCategories', dataCategories)
  console.log('transformedData', treeData)
  console.log('dataTree', treeData)

  React.useEffect(() => {
    if (dataCategories) {
      const transformedData = dataCategories.map((item: any) => {
        return {
          title: item?.parent_category,
          value: item?.parent_category_id.toString(),
          key: item?.parent_category_id.toString(),
          children: item.childs.map((child: any) => {
            return {
              title: child.name,
              value: child.id.toString(),
              key: child.id.toString(),
            }
          }),
        }
      })
      console.log('transformedData', transformedData)
      setTransformedData(transformedData)
    }
  }, [dataCategories])

  const handleClose = () => setOpenModalCareerObjective(false)
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    treeCheckStrictly: false,
    // Enable strict checking
    // Disable the "All" checkbox at the root level
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
      zIndex: '1301',
      margin: '12px auto',
    },
  }
  return (
    <Modal
      open={openModalCareerObjective}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          Lĩnh vực quan tâm
        </Typography>
        <TreeSelect {...tProps} />
        <Button variant="contained" fullWidth>
          Lưu thông tin
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalProfileCareerObjectice
