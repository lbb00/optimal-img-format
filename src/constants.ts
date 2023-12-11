export type ImgFormat = 'avif' | 'webp'

export const OPTIMAL_FORMATS_DEFAULT: ImgFormat[] = ['avif', 'webp']

export const ImgFormatMIMETypes: Record<ImgFormat, string> = {
	avif: 'image/avif',
	webp: 'image/webp',
}
