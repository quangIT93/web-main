import React from 'react'
//@ts-ignore
import imageCompression from 'browser-image-compression'
import { validatePostImages } from 'validations'
//@ts-ignore
import { toast } from 'react-toastify'

interface PostImageProps {
  selectedImages: string[]
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>
  selectedFiles: File[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>
}
const PostImage: React.FC<PostImageProps> = (props) => {
  const { selectedImages, setSelectedImages, selectedFiles, setSelectedFiles } =
    props
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
    const imagesToCheck =
      selectedFiles.length + imagesUpload.length > 5
        ? imagesUpload.slice(0, 5 - selectedImages.length)
        : imagesUpload
    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck)
      if (validateImagesReply.isError) {
        console.log('::: Invalid images')
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

          console.log('Original image ::: ', imagesUpload)
          console.log('Compressed image ::: ', compressedImages)

          setSelectedFiles((prevState) => [
            ...prevState,
            ...compressedImages.map((image: any) => ({
              image,
              preview: window.URL.createObjectURL(image),
            })),
          ])
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (files) {
      const newImages: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        reader.onload = () => {
          const imageDataURL = reader.result as string
          newImages.push(imageDataURL)

          if (newImages.length === files.length) {
            setSelectedImages((prevImages: string[]) => [
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
  return (
    <div className="postImages">
      <input type="file" multiple onChange={handleImageChange} id="chooseImg" />

      <div>
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            width={300}
            height={320}
          />
        ))}
      </div>
    </div>
  )
}

export default PostImage
