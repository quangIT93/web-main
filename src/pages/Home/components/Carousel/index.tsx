import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoPlay from 'embla-carousel-autoplay'
import './style.scss'

interface DotPaginationProsp {
  selected: boolean
  onClick: () => void
}

const DotPagination: React.FC<DotPaginationProsp> = ({ selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ transition: 'all 0.3s ease-outk' }}
      className={selected ? 'pagination__dot-selected' : 'pagination__dot'}
    />
  )
}

interface EmblaCarouselItemProps {
  imageLink: string
  description: string
}

const EmblaCarouselItem: React.FC<EmblaCarouselItemProps> = ({
  imageLink,
  description,
}) => {
  return (
    <div className="embla__slide">
      <img src={imageLink} alt={description} />
    </div>
  )
}

const EmblaCaroysel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)
  const scrollSnaps = [0, 0, 0]
  const emblaContainerRef = React.useRef<HTMLDivElement>(null)
  const [viewPortRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
    },
    [AutoPlay({ delay: 5000 })]
  )

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
    }
  }

  const onSelect = () => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap)
  }

  const handleMouseEvent = () => {
    const { current: emblaContainerEl } = emblaContainerRef

    if (emblaContainerEl) {
      emblaContainerEl.addEventListener('mousedown', () => {
        emblaContainerEl.style.cursor = 'grabbing'
      })

      emblaContainerEl.addEventListener('mouseup', () => {
        emblaContainerEl.style.cursor = 'grab'
      })
    }
  }

  React.useEffect(() => {
    handleMouseEvent()

    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap)
      emblaApi.on('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="embla" ref={viewPortRef}>
      <div ref={emblaContainerRef} className="embla__container">
        <EmblaCarouselItem
          imageLink="/images/banner.png"
          description="Banner about HiJob"
        />
        <EmblaCarouselItem
          imageLink="/images/project-manager.png"
          description="Hire Project manager"
        />
        <EmblaCarouselItem
          imageLink="/images/project-manager.png"
          description="Hire Project manager"
        />
      </div>
      <div className="embla__pagination">
        {scrollSnaps.map((_, index: number) => (
          <DotPagination
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default EmblaCaroysel
