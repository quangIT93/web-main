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
import IMG5 from '../../video/5.mp4';
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
    {
      title: 'TIKTOK 5',
      urlImg: 'https://example.com/first',
      urlVideo: IMG5,
    },
  ];

  const dataTiktok = new MyClass(tiktokData);

  const swiperRef = React.useRef<any>();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setPlaying] = React.useState(true);
  const [isMuted, setMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState<number | null>(
    null,
  );
  const [videoStates, setVideoStates] = React.useState<{
    [key: number]: { currentTime: number; duration: number };
  }>({});

  const togglePlayPause = (index: number, activeSlideIndex: number | null) => {
    const video = document.getElementById(
      `video_${index}`,
    ) as HTMLVideoElement | null;

    const video1 = document.getElementById(
      `video_${activeSlideIndex !== null ? activeSlideIndex : index + 1}`,
    ) as HTMLVideoElement | null;

    console.log('play video index', index);
    console.log('play video activeSlideIndex', activeSlideIndex);
    console.log('video', video);
    console.log('video1', video1);

    if (video && video1) {
      if (video.paused) {
        video.play();
        video1?.pause();
      } else {
        video.pause();
        video1?.pause();
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

  const updateProgressBar = (index: number) => {
    const video = document.getElementById(
      `video_${index}`,
    ) as HTMLVideoElement | null;
    // console.log('click', video);
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

  const handleSlideChange = (index: any) => {
    // if (isPlaying) {
    //   togglePlayPause(index, );
    // }
  };

  const handleTransition = (index: any) => {
    // Get the active slide index during the transition
    console.log('index', index);
    console.log('activeSlideIndex', activeSlideIndex);

    setActiveSlideIndex(index);
    togglePlayPause(index, activeSlideIndex);
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
          modules={[Mousewheel]}
          className={`${style.content_tiktok__items} mySwiper`}
          ref={swiperRef}
          // onSlideChange={handleSlideChange}
          onTransitionEnd={(swiper) => handleTransition(swiper.realIndex)}
          onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
        >
          {dataTiktok.data.map((tikTok, index) => (
            <SwiperSlide key={index}>
              <div
                className={style.content_tiktok__items__video}
                style={{
                  position: 'relative',
                  // marginTop: '25%', // Adjust this value to control the amount of overlap
                  // marginBottom: '25%',
                }}
              >
                <div className={style.wrap_video}>
                  <video
                    id={`video_${index}`}
                    // Make the ID unique
                    width="322"
                    height="576"
                    muted={isMuted}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    onTimeUpdate={() => updateProgressBar(index)}
                    className={style.video}
                  >
                    <source src={tikTok.urlVideo} type="video/mp4" />
                  </video>
                  <div id={style.custom_controls}>
                    <div
                      onClick={() => togglePlayPause(index, null)}
                      id={style.play_pause}
                    >
                      {isPlaying ? '❚❚' : '▶'}
                    </div>
                    <div id={style.progress_bar_container} onClick={seek}>
                      <div id={style.progress_bar}>
                        <div
                          className={style.progress}
                          id={style.progress}
                          style={{
                            width: `${(currentTime / duration) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div onClick={toggleMute} id={style.volume_control}>
                      {isMuted ? '🔊' : '🔈'}
                    </div>
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
