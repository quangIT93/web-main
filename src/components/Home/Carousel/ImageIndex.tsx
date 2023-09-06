// import image1 from './images/banner.png';
// import image2 from './images/project-manager.png';
// import image3 from './images/project-manager.png';
// import image4 from './images/banner web 3.png';
// import image4 from './images/project-manager.png'

export const images: string[] = [
  // '../images/banner.png',
  // '../images/project-manager.png',
  // '../images/project-manager.png',
  // '../images/project-manager.png',
  // '../images/banners/banner web 3.png',
  // '../images/banners/test size.png',
];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
