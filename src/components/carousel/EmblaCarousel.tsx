'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'                                  // ← NEW
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

/* ───── tweak this if you want stronger / weaker parallax ───── */
const TWEEN_FACTOR_BASE = 0.35

/* ----------------------------------
   Slide data (fallback)
---------------------------------- */
export type Slide = {
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

type Props = {
  slides?: Slide[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<Props> = ({
  slides = defaultSlides,
  options = defaultOptions,
}) => {
  /* embla hook -------------------------------------------------- */
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  /* parallax helpers ------------------------------------------- */
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api
      .slideNodes()
      .map((slideNode) => slideNode.querySelector(
        '.embla__parallax__layer'
      ) as HTMLElement)
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback(
    (api: EmblaCarouselType, evt?: EmblaEventType) => {
      const engine         = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView   = api.slidesInView()
      const isScroll       = evt === 'scroll'

      api.scrollSnapList().forEach((snap, snapIdx) => {
        let diff = snap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIdx]

        slidesInSnap.forEach((slideIdx) => {
          if (isScroll && !slidesInView.includes(slideIdx)) return

          /* loop correction */
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((l) => {
              if (slideIdx === l.index && l.target() !== 0) {
                const sign = Math.sign(l.target())
                diff = sign === -1
                  ? snap - (1 + scrollProgress)
                  : snap + (1 - scrollProgress)
              }
            })
          }

          const translate = diff * -tweenFactor.current * 100
          tweenNodes.current[slideIdx].style.transform =
            `translateX(${translate}%)`
        })
      })
    },
    []
  )

  /* dots / arrows ---------------------------------------------- */
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  /* listeners --------------------------------------------------- */
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

  /* markup ------------------------------------------------------ */
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, i) => (
            <div className="embla__slide" key={i}>
              <div className="embla__parallax">
                <div className="embla__parallax__layer">
                  {/* next/image replaces <img> */}
                  <Image
                    src={slide.src}
                    alt={slide.alt || slide.title}
                    fill
                    sizes="(max-width:768px) 90vw, 50vw"
                    className="embla__slide__img embla__parallax__img"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}          /* LCP help */
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
          {scrollSnaps.map((_, idx) => (
            <DotButton
              key={idx}
              onClick={() => onDotButtonClick(idx)}
              className={`embla__dot${idx === selectedIndex ? ' embla__dot--selected' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
