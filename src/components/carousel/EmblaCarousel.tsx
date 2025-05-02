import React, { useCallback, useEffect, useRef } from 'react'
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const TWEEN_FACTOR_BASE = 0.35/* change parralax punch */
4
type Slide = {
  src: string
  title: string
  alt?: string
}

const defaultSlides: Slide[] = [
  {
    src: '/assets/photos/american-bald-eagle-charcuterie-board-bottom-home-page.webp',
    title: 'Perfect for Any Occasion or Holiday',
    alt: 'Perfect for Any Occasion or Holiday',
  },
  {
    src: '/assets/photos/loggerhead-cay-sanibel-florida-charcuterie-board.webp',
    title: 'Commemorate Special Events',
    alt: 'Commemorate Special Events',
  },
  {
    src: '/assets/photos/blue-fox-crystals-charcuterie-board.webp',
    title: 'Blue Fox Crystals Board',
    alt: 'Blue Fox Crystals Board',
  },
  {
    src: '/assets/photos/wurst-family-charcuterie-board.webp',
    title: 'The Wurst Family Board',
    alt: 'The Wurst Family Board',
  },
  {
    src: '/assets/photos/gift-basket-charcuterie-board.webp',
    title: 'Gourmet Gift Basket Board',
    alt: 'Gourmet Gift Basket Board',
  },
]

const defaultOptions: Partial<EmblaOptionsType> = {
  align: 'center',
  loop: true,
  containScroll: 'trimSnaps',
}

type PropType = {
  slides?: Slide[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({
  slides = defaultSlides,
  options = defaultOptions,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map(
      (slideNode) =>
        slideNode.querySelector('.embla__parallax__layer') as HTMLElement
    )
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback(
    (api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)
                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const translate = diffToTarget * -tweenFactor.current * 100
          const tweenNode = tweenNodes.current[slideIndex]
          tweenNode.style.transform = `translateX(${translate}%)`
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, idx) => (
            <div className="embla__slide" key={idx}>
              <div className="embla__parallax">
                <div className="embla__parallax__layer">
                  <img
                    className="embla__slide__img embla__parallax__img"
                    src={slide.src}
                    alt={slide.alt || slide.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot${
                index === selectedIndex ? ' embla__dot--selected' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
