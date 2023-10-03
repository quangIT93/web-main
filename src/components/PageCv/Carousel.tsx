import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
export const CarouselItem = ({ children, width }: any) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragEndX, setDragEndX] = useState(0);
  const swipe = useRef<any>({});

  const updateIndex = (newIndex: any) => {
    if (newIndex >= React.Children.count(children) || newIndex < 0) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 5000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex]);

  const onTouchStart = (e: any) => {
    const touch = e.touches[0];
    swipe.current = { x: touch.clientX };
  };

  const onTouchMove = (e: any) => {
    if (e.changedTouches && e.changedTouches.length) {
      swipe.current.swiping = true;
    }
  };

  const onTouchEnd = (e: any) => {
    const touch = e.changedTouches[0];
    const swipedLeft = touch.clientX - swipe.current.x > 0 ? true : false;
    const swipedRight = touch.clientX - swipe.current.x > 0 ? false : true;
    const absX = Math.abs(touch.clientX - swipe.current.x);
    if (swipe.current.swiping && absX > 50) {
      if (swipedLeft) {
        updateIndex(activeIndex - 1);
      } else if (swipedRight) {
        updateIndex(activeIndex + 1);
      }
    }
    swipe.current = {};
  };

  // click mouse

  const onPointerDown = (e: any) => {
    const touch = e.type === 'touchstart' ? e.touches[0] : e;
    swipe.current = { x: touch.clientX };
    setDragging(true);
    e.target.classList.add('hand-cursor');
    e.preventdefault();
  };

  const onPointerMove = (e: any) => {
    if (dragging) {
      const touch = e.type === 'touchmove' ? e.touches[0] : e;
      const absX = Math.abs(touch.clientX - swipe.current.x);
      if (absX > 50) {
        // Thực hiện chức năng kéo ở đây
        if (touch.clientX - swipe.current.x > 0) {
          updateIndex(activeIndex - 1);
        } else {
          updateIndex(activeIndex + 1);
        }
        swipe.current = {};
        setDragging(false);
      }
    }
  };

  const onPointerUp = (e: any) => {
    if (dragging) {
      const touch = e.type === 'touchend' ? e.changedTouches[0] : e;
      const absX = Math.abs(touch.clientX - swipe.current.x);
      if (absX > 50) {
        // Thực hiện chức năng kéo ở đây
        if (touch.clientX - swipe.current.x > 0) {
          updateIndex(activeIndex - 1);
        } else {
          updateIndex(activeIndex + 1);
        }
      }
      e.target.classList.remove('hand-cursor');
      swipe.current = {};
      setDragging(false);
    }
  };

  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return (
    <div
      className={`carousel ${isTouchDevice ? 'touch-enabled' : ''} ${
        dragging ? '' : 'no-drag-cursor'
      }`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
      <button
        onClick={() => updateIndex(activeIndex - 1)}
        className="btn-left btn-scroll"
      >
        <LeftOutlined />
      </button>
      <button
        onClick={() => updateIndex(activeIndex + 1)}
        className="btn-right btn-scroll"
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Carousel;
