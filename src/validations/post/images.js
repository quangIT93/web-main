const validatePostImages = (images) => {
  let isValid = true
  let message = ''
  const imageSizeLimited = 10 * 1024 * 1024

  images.forEach((image) => {
    if (!image.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      isValid = false
      message = 'Định dạng không hợp lệ'
      return
    }

    if (image.size > imageSizeLimited) {
      isValid = false
      message = 'Kích thước ảnh vượt quá 10MB'
      return
    }
  })
  return isValid
    ? {
        isError: false,
      }
    : {
        isError: true,
        message,
      }
}

export default validatePostImages
