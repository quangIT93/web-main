import React, { useEffect, memo } from 'react'
import { Box, Button, Typography } from '@mui/material'

// import { blobToBase64 } from 'blob-util'

//@ts-ignore
import imageCompression from 'browser-image-compression'
import { validatePostImages } from 'validations'
//@ts-ignore
import { toast } from 'react-toastify'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import './style.scss'

interface IEditPostImage {
  editDataPosted: any
  setEditDataPosted: React.Dispatch<React.SetStateAction<any>>
  dataPosted: any
}

const EditPostImage: React.FC<IEditPostImage> = (props) => {
  const { editDataPosted, setEditDataPosted, dataPosted } = props

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const [selectedImages, setSelectedImages] = React.useState<any[]>([])

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    const imagesUpload: any = Array.from(
      event.target.files ? event.target.files : []
    )

    // console.log('imagesUpload', imagesUpload)
    // console.log('selectedFiles', selectedFiles)
    // console.log('selectedImages', selectedImages)

    const imagesToCheck =
      selectedFiles.length + imagesUpload.length > 5
        ? imagesUpload.slice(0, 5 - selectedImages?.length)
        : imagesUpload

    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck)
      if (validateImagesReply.isError) {
        // console.log('::: Invalid images')
        return toast.warn('Ảnh không đúng định dạng')
      } else {
        try {
          const compressedImages: any = []
          await Promise.all(
            imagesToCheck.map(async (image: any) => {
              const compressedImage = await imageCompression(image, options)
              compressedImages.push(
                new File([compressedImage], compressedImage.name, {
                  type: compressedImage.type,
                })
              )
            })
          )

          // console.log('Original image ::: ', imagesUpload)
          // console.log('Compressed image ::: ', compressedImages)

          setSelectedFiles((prevState) => [
            ...prevState,
            ...compressedImages.map((image: any) => ({
              image,
              preview: window.URL.createObjectURL(image),
            })),
          ])

          setEditDataPosted((preValue: any) => ({
            ...preValue,
            images: [
              ...preValue.images,
              ...compressedImages.map((image: any) => ({
                image,
                preview: window.URL.createObjectURL(image),
              })),
            ],
          }))
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (files && dataPosted) {
      const newImages: any[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        reader.onload = () => {
          const imageDataURL = reader.result as string
          newImages.push({
            id: null,
            image: imageDataURL,
            status: null,
          })

          if (newImages.length === files.length) {
            setSelectedImages((prevImages: any) => [
              ...prevImages,
              ...newImages,
            ])
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }
  console.log('selectedFiles', selectedFiles)
  useEffect(() => {
    if (selectedFiles) {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        images: [...selectedFiles],
      }))
    }
  }, [])

  useEffect(() => {
    if (dataPosted) {
      setSelectedImages(dataPosted)
    }
  }, [])

  const handleDeleteImage = (index: number, id: number | null) => {
    setSelectedImages((prevImages: any) => {
      const updatedImages = [...prevImages]
      updatedImages.splice(index, 1)
      return updatedImages
    })
    setSelectedFiles((prevFiles: any) => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index - dataPosted.length - 1, 1)
      return updatedFiles
    })

    setEditDataPosted((preValue: any) => {
      const updatedFiles = [...preValue.images]
      updatedFiles.splice(index - dataPosted.length - 1, 1)

      return {
        ...preValue,
        images: updatedFiles,
      }
    })

    if (id && !editDataPosted.deletedImages.includes(id)) {
      setEditDataPosted((preValue: any) => ({
        ...preValue,
        deletedImages: [...preValue.deletedImages, { id: id }],
      }))
    }
  }

  return (
    <div className="edit-post_image">
      <Box p="0rem 0">
        <Box sx={{ display: 'flex', minWidth: '150px', minHeight: '150px' }}>
          {selectedImages?.map((image: any, index: number) => (
            <div
              className="item-editPost_image"
              style={{
                // padding: '12px',
                border: '1px solid #ccc',
                position: 'relative',
                marginRight: '12px',
                height: '150px',
                width: '150px',
              }}
              key={index}
            >
              <img
                key={index}
                src={image.image}
                alt={`ảnh bị lỗi`}
                style={{
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                }}
              />
              <div
                className="deleteButton"
                onClick={() => handleDeleteImage(index, image.id)}
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  border: 'solid 1px #ccc',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ccc',
                  cursor: 'pointer',
                }}
              >
                <CloseOutlinedIcon />
              </div>
            </div>
          ))}
        </Box>
        <Typography
          variant="body1"
          color="#ccc"
          p="1rem 0"
          sx={{ fontStyle: 'italic' }}
        >
          Có thể tải tối đa 5 ảnh, mỗi ảnh không quá 5MB. (Định dạng cho phép:
          jpeg, jpg, png)
        </Typography>

        {/* <Box>
      <CreatePostImages
      images={images}
      handleRemoveImage={handleRemoveImage}
      />
    </Box> */}
      </Box>
      <Box mt="0">
        <Button
          variant="outlined"
          component="label"
          disabled={selectedImages?.length === 5}
        >
          Tải ảnh
          <input
            type="file"
            name="images"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            multiple
          />
        </Button>
      </Box>
    </div>
  )
}

export default memo(EditPostImage)
