// import useEmblaCarousel from 'embla-carousel-react'
// import React from 'react'
// // @ts-ignore
// import { ArrowrightIcon } from '#components'
// import './style.scss'

// interface CategoryCarouselItemProps {
//   content: string
//   imageLink: string
//   imageDescription?: string
// }

// const categories = [
//   {
//     id: 1,
//     name: 'Tất cả',
//     image: '/images/category/all.png',
//   },
//   {
//     id: 2,
//     name: 'Dịch vụ',
//     image: '/images/category/service.png',
//   },
//   {
//     id: 3,
//     name: 'Làm đẹp',
//     image: '/images/category/make-beautifully.png',
//   },
//   {
//     id: 4,
//     name: 'Giao hàng',
//     image: '/images/category/ship.png',
//   },
//   {
//     id: 5,
//     name: 'Khách sạn',
//     image: '/images/category/hotel.png',
//   },
//   {
//     id: 6,
//     name: 'Soạn thảo',
//     image: '/images/category/soan-thao.png',
//   },
//   {
//     id: 7,
//     name: 'Gia sư',
//     image: '/images/category/tutor.png',
//   },
//   {
//     id: 8,
//     name: 'Dịch thuật',
//     image: '/images/category/translate.png',
//   },
//   {
//     id: 9,
//     name: 'Chuyển nhà/ Vệ	sinh',
//     image: '/images/category/move-house.png',
//   },
//   {
//     id: 10,
//     name: 'Thiết kế nội thất',
//     image: '/images/category/design-furniture.png',
//   },
//   {
//     id: 11,
//     name: 'Thiết kế',
//     image: '/images/category/design.png',
//   },
//   {
//     id: 12,
//     name: 'IT/Programing',
//     image: '/images/category/it.png',
//   },
//   {
//     id: 13,
//     name: 'Marketing',
//     image: '/images/category/marketing.png',
//   },
//   {
//     id: 14,
//     name: 'Chụp ảnh',
//     image: '/images/category/video.png',
//   },
//   {
//     id: 15,
//     name: 'Sự kiện',
//     image: '/images/category/event.png',
//   },
//   {
//     id: 16,
//     name: 'Chăm sóc thú cưng',
//     image: '/images/category/pet-care.png',
//   },
//   {
//     id: 17,
//     name: 'Thời trang & Làm đẹp',
//     image: '/images/category/make-up.png',
//   },
//   {
//     id: 18,
//     name: 'Thể thao',
//     image: '/images/category/sports.png',
//   },
//   {
//     id: 19,
//     name: 'Pháp luật',
//     image: '/images/category/law.png',
//   },
//   {
//     id: 20,
//     name: 'Tư vấn kỹ năng',
//     image: '/images/category/psychology.png',
//   },
//   {
//     id: 21,
//     name: 'Nghề thủ công',
//     image: '/images/category/crafty.png',
//   },

//   {
//     id: 22,
//     name: 'Sinh hoạt/ Giúp việc',
//     image: '/images/category/help-with-housework.png',
//   },
// ]

// const CategoryCarouselItem: React.FC<CategoryCarouselItemProps> = ({
//   content,
//   imageLink,
//   imageDescription,
// }) => {
//   return (
//     <div className="category-carousel__slide ">
//       <div>
//         <img src={imageLink} alt={imageDescription} />
//       </div>
//       <div>
//         <span>{content}</span>
//       </div>
//     </div>
//   )
// }

// const CategoryCarousel: React.FC = () => {
//   const [viewPortRef, emblaApi] = useEmblaCarousel({
//     align: 'start',
//   })

//   return (
//     <div
//       style={{
//         backgroundColor: 'blue',
//         width: '100%',
//         height: '100%;',
//         position: 'relative',
//       }}
//     >
//       <button className="container__previous-job job-btn">
//         <ArrowrightIcon />
//       </button>
//       <div ref={viewPortRef} className="category-carousel ">
//         <div className="category-carousel__container ">
//           {categories.map((category, index) => (
//             <CategoryCarouselItem
//               key={index}
//               content={category.name}
//               imageLink={category.image}
//             />
//           ))}
//         </div>
//       </div>
//       <button className="container__next-job job-btn">
//         <ArrowrightIcon />
//       </button>
//     </div>
//   )
// }

// export default CategoryCarousel

import React from 'react'

const index1 = () => {
  return <div>index1</div>
}

export default index1
