import React from 'react'
interface PostImageProps {
  selectedImages: string[]
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>
}
const PostImage: React.FC<PostImageProps> = (props) => {
  const { selectedImages, setSelectedImages } = props
  console.log('selectedImages', selectedImages)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
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
