'use client'
import NextImage, { StaticImageData, ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'placeholder'> & {
  src: StaticImageData | string
}

export default function BlurImage({ src, alt, ...rest }: Props) {
  // If `src` is a string (dynamic), we can’t auto‑generate blurDataURL,
  // so we just use default behavior (no blur). Static imports get blur.
  const isStatic = typeof src !== 'string'

  return (
    <NextImage
      src={src}
      alt={alt}
      placeholder={isStatic ? 'blur' : undefined}
      {...rest}
    />
  )
}
