import React from 'react';
import './categoryItem.scss';

interface CategoryCarouselItemProps {
  content: string;
  imageLink: string;
  imageDescription?: string;
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
          className="img-category"
          src={imageLink}
          alt={imageDescription}
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      <div>
        <span
          className="title-categoryItem"
          style={{ fontSize: '10px', color: '#000000' }}
        >
          {content}
        </span>
      </div>
    </div>
  );
};

export default CategoryItem;
