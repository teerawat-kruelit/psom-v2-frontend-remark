import NextImage from 'next/image'
import { cn } from '@/lib/utils'

interface FillImageProps {
  src: string
  alt: string
  className?: string
  imageType?: 'object-cover' | 'object-contain'
  overlayClassName?: string
  priority?: boolean
}

export function Image({
  src,
  alt,
  className,
  imageType = 'object-cover',
  overlayClassName,
  priority = false,
}: FillImageProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <NextImage src={src} alt={alt} fill className={imageType} priority={priority} />
      {overlayClassName && <div className={cn('absolute inset-0 bg-black/20', overlayClassName)} />}
    </div>
  )
}
