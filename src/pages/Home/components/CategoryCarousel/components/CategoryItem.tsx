import React from 'react'

interface CategoryCarouselItemProps {
  content: string
  imageLink: string
  imageDescription?: string
}

const CategoryItem: React.FC<CategoryCarouselItemProps> = ({
  content,
  imageLink,
  imageDescription,
}) => {
  return (
    <div className="test">
      <div className="text">
        <img
          src={imageLink}
          alt={imageDescription}
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      <div>
        <span style={{ fontSize: '10px' }}>{content}</span>
      </div>
    </div>
  )
}

export default CategoryItem
