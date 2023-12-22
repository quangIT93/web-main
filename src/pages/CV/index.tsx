import * as React from 'react';

// @ts-ignore
import { Navbar } from '#components';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import SwiperCore, { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Mousewheel, Pagination } from 'swiper';
import IMG1 from '../../video/1.mp4';
import IMG2 from '../../video/2.mp4';
import IMG3 from '../../video/3.mp4';
import IMG4 from '../../video/4.mp4';
import style from './style.module.scss';
// import style1 from './style1.module.scss';
import MyClass, { IDataTiktok } from './data';

const CV: React.FC = () => {
  const profileV3 = useSelector(
    (state: RootState) => state.dataProfileInformationV3.data,
  );

  if (
    profileV3.name !== 'Thái Minh Quang' &&
    !localStorage.getItem('accessToken')
  ) {
    window.open('/', '_parent');
  }

  const tiktokData = [
    {
      title: 'TIKTOK 1',
      urlImg: 'https://example.com/first',
      urlVideo: IMG1,
    },
    {
      title: 'TIKTOK 2',
      urlImg: 'https://example.com/first',
      urlVideo: IMG2,
    },
    {
      title: 'TIKTOK 3',
      urlImg: 'https://example.com/first',
      urlVideo: IMG3,
    },
    {
      title: 'TIKTOK 4',
      urlImg: 'https://example.com/first',
      urlVideo: IMG4,
    },
  ];

  const dataTiktok = new MyClass(tiktokData);

  const swiperRef = React.useRef<any>();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setPlaying] = React.useState(false);
  const [isMuted, setMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState<number | null>(
    null,
  );

  const togglePlayPause = (index: number) => {
    const video = document.getElementById(
      `video_${index}`,
    ) as HTMLVideoElement | null;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      setPlaying(!isPlaying);
    }
  };

  const seek = (event: React.MouseEvent) => {
    const video = document.getElementById('video') as HTMLVideoElement | null;
    const progressBar = document.getElementById('progress-bar');
    if (video && progressBar) {
      const progressBarRect = progressBar.getBoundingClientRect();
      const clickPosition = event.clientX - progressBarRect.left;
      const percentage = (clickPosition / progressBarRect.width) * 100;
      video.currentTime = (percentage / 100) * video.duration;
    }
  };

  console.log('currentTime', currentTime);
  console.log('duration', duration);
  const updateProgressBar = (index: number) => {
    const video = document.getElementById(
      `video_${index}`,
    ) as HTMLVideoElement | null;
    console.log('click', video);
    if (video) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('video') as HTMLVideoElement | null;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  const handleSlideChange = () => {
    // Pause the currently playing video
    console.log('scroll');

    if (isPlaying) {
      togglePlayPause(activeSlideIndex || 0);
    }
  };

  const handleTransition = () => {
    // Get the active slide index during the transition
    const activeIndex = swiperRef.current?.activeIndex;

    // Do something with the activeIndex, e.g., play the video
    // You can add additional logic based on the activeIndex
    console.log('Active Slide Index:', activeIndex);

    // Example: Play the video when reaching a specific slide index
    console.log('scroll handleTransition');

    if (activeIndex === 2) {
      togglePlayPause(activeIndex);
    }
  };

  return (
    <div className={style.container_tiktok}>
      <Navbar />
      <div className={style.content_tiktok}>
        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={{
            sensitivity: 0.5,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className={`${style.content_tiktok__items} mySwiper`}
          ref={swiperRef}
          onSlideChange={handleSlideChange}
          onTransitionEnd={handleTransition}
        >
          {dataTiktok.data.map((tikTok, index) => (
            <SwiperSlide key={index}>
              <div className={style.content_tiktok__items__video}>
                <video
                  id={`video_${index}`} // Make the ID unique
                  width="576"
                  height="322"
                  muted={isMuted}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  className="mySwiper"
                  onTimeUpdate={() => updateProgressBar(index)}
                >
                  <source src={tikTok.urlVideo} type="video/mp4" />
                </video>
                <div id={style.custom_controls}>
                  <div
                    onClick={() => togglePlayPause(index)}
                    id={style.play_pause}
                  >
                    {isPlaying ? '❚❚' : '▶'}
                  </div>
                  <div id={style.progress_bar_container} onClick={seek}>
                    <div id={style.progress_bar}>
                      <div
                        className={style.progress}
                        id={style.progress}
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div onClick={toggleMute} id={style.volume_control}>
                    {isMuted ? '🔊' : '🔈'}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer />
    </div>
  );
};

export default CV;
