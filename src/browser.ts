import type { ImgFormat } from './constants'
import { OPTIMAL_FORMATS_DEFAULT } from './constants'

const cachedSupportMap: Record<ImgFormat, boolean | undefined> = {
  avif: undefined,
  webp: undefined,
}
const loadImagePromiseMap: Record<string, Promise<HTMLImageElement>> = {}
function loadImage(src: string, key: string) {
  if (loadImagePromiseMap[key] === undefined) {
    loadImagePromiseMap[key] = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        resolve(img)
      }
      img.onerror = reject
    })
  }

  return loadImagePromiseMap[key]
}

export async function isSupportAVIF() {
  if (cachedSupportMap.avif === undefined) {
    try {
      await loadImage(
        'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
        'avif'
      )
      cachedSupportMap.avif = true
    } catch (e) {
      cachedSupportMap.avif = false
    }
  }
  return cachedSupportMap.avif
}

export async function isSupportWebP() {
  if (cachedSupportMap.webp === undefined) {
    try {
      const img = await loadImage('data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==', 'webp')
      cachedSupportMap.webp = img.width > 0 && img.height > 0
    } catch (e) {
      cachedSupportMap.webp = false
    }
  }

  return cachedSupportMap.webp
}

const formatSupportMap: Record<ImgFormat, () => Promise<boolean>> = {
  avif: isSupportAVIF,
  webp: isSupportWebP,
}
export async function getOptimalImgFormatOnBrowser(optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT) {
  const results = await Promise.all(optimalFormats.map((format) => formatSupportMap[format]?.()))
  return optimalFormats[results.findIndex(Boolean)]
}
