import React, { useState, useEffect, useCallback, memo, useMemo } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { DotButton, PrevButton, NextButton } from './components'
import imageByIndex from './ImageIndex'
import Autoplay from 'embla-carousel-autoplay'

const EmblaCarousel: React.FC = () => {
  const SLIDE_COUNT = 3
  const slides = useMemo(() => {
    // Tính toán giá trị result dựa trên dep1 và dep2
    // ...
    return Array.from(Array(SLIDE_COUNT).keys())
  }, [SLIDE_COUNT])

  const options: EmblaOptionsType = {
    loop: true,
    align: 'center',
  }
  console.log('render carolsale')
  //   const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const emblaContainerRef = React.useRef<HTMLDivElement>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ])
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const handleMouseEvent = () => {
    const { current: emblaContainerEl } = emblaContainerRef

    if (emblaContainerEl) {
      emblaContainerEl.addEventListener('mousedown', () => {
        emblaContainerEl.style.cursor = 'grabbing'
        console.log(emblaApi)
        emblaApi?.clickAllowed()
      })

      emblaContainerEl.addEventListener('mouseup', () => {
        emblaContainerEl.style.cursor = 'grab'
      })
    }
  }

  React.useEffect(() => {
    handleMouseEvent()

    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      //   setSelectedIndex(emblaApi.selectedScrollSnap)
      //   onSelect()
      //   emblaApi.on('select', onSelect)
    }
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <>
      <div
        className="embla"
        // style={{ position: 'fixed', top: '-100%' }}
      >
        <div className="embla__viewport" ref={emblaRef}>
          <div
            className="embla__container"
            ref={emblaContainerRef}
            style={{ marginLeft: '1px' }}
          >
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={imageByIndex(index)}
                  alt="Your alt text"
                />
              </div>
            ))}
          </div>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(EmblaCarousel)
