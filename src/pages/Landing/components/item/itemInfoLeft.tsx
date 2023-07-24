import React from 'react';
// @ts-ignore

import './itemInfoLeft.scss';
import { Link } from 'react-router-dom';

interface CategoryCarouselItemProps {
  content: string;
  describe: string;
  imageDescription?: string;
  imgBackground?: string;
  titleButton?: string;
  tagId: string;
}

const ItemInfoLeft: React.FC<CategoryCarouselItemProps> = ({
  content,
  describe,
  imageDescription,
  imgBackground,
  titleButton,
  tagId,
}) => {
  return (
    <div
      id={`${tagId}`}
      className="container"
      style={{ backgroundImage: `url(${imgBackground})` }}
    >
      <div className="div-img">
        <img src={imageDescription} />
      </div>
      <div className="div-content">
        <div id="div-content">
          <p>{content}</p>
        </div>
        <div id="div-describe">
          <p>{describe}</p>
        </div>
        <a href="https://www.facebook.com/hijobOfficial/" target="_blank">
          <div className="btn-contract">
            <p> {titleButton} </p>
          </div>
        </a>
      </div>
      <div className="space"></div>
    </div>
  );
};

export default ItemInfoLeft;
