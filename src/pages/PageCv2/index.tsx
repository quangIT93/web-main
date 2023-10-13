import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducer';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import './style.scss';
import apiCv from 'api/apiCv';

const NextArrow = (props: any) => (
  <div className="custom-next-arrow" onClick={props.onClick}>
    <RightOutlined />
  </div>
);

const PrevArrow = (props: any) => (
  <div className="custom-prev-arrow" onClick={props.onClick}>
    <LeftOutlined />
  </div>
);

const PageCv2 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    afterChange: onSlideChange,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true, // Bật chế độ tự động chạy
    autoplaySpeed: 2000, // Thời gian giữa các lần chuyển slide (milliseconds)
  };
  const profileV3 = useSelector((state: RootState) => state.dataProfileV3.data);
  const [getThemeCv, setGetThemeCv] = React.useState<any>([]);
  const [slickAct, setSlickAct] = React.useState<any>(
    document.querySelectorAll('.slick-active'),
  );

  const getTheme = async () => {
    try {
      const result = await apiCv.getThemeCv();
      if (result) {
        setGetThemeCv(result.data);
      }
    } catch (error) {}
  };

  // Hàm xử lý sau khi slider thay đổi slide
  function onSlideChange(currentSlide: number) {
    // Lấy danh sách các phần tử .slick-active trong Slider
    const activeSlides = document.querySelectorAll('.slick-active');
    if (activeSlides.length !== 0) {
      activeSlides[1].classList.add('slick-slider-center');
      activeSlides[0].classList.remove('slick-slider-center');
      activeSlides[2].classList.remove('slick-slider-center');
      activeSlides[3].classList.remove('slick-slider-center');
      setSlickAct(activeSlides);
    }
  }

  useEffect(() => {
    getTheme();
    // Lấy danh sách các phần tử .slick-active trong Slider
    const activeSlides = document.querySelectorAll('.slick-active');

    if (activeSlides && activeSlides.length > 1) {
      activeSlides[1].classList.add('slick-slider-center');
    }
    setSlickAct(activeSlides);
  }, [profileV3]); // Chạy chỉ một lần khi component được tạo

  return (
    <Slider className="your-class" {...settings}>
      {profileV3 ? (
        getThemeCv?.map((item: any) => (
          <img src={item.image} alt={item.name} />
          //   <div className=''>
          //   </div>
        ))
      ) : (
        <></>
      )}
    </Slider>
  );
};

export default PageCv2;
