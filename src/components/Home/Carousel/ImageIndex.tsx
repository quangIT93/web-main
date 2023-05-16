import image1 from './images/banner.png'
import image2 from './images/project-manager.png'
import image3 from './images/project-manager.png'
// import image4 from './images/project-manager.png'

export const images: string[] = [
  '../images/banner.png',
  '../images/project-manager.png',
  '../images/project-manager.png',
  '../images/project-manager.png',
]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex
