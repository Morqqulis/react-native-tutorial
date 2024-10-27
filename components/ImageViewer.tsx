import { Image } from 'expo-image'
import { cssInterop } from 'nativewind'
cssInterop(Image, { className: 'style' })

interface IImageViewer {
	imgSource: string
	className?: string
	selectedImage?: string
}

const ImageViewer = ({ imgSource, className, selectedImage }: IImageViewer) => {
	return <Image className={`w-full h-full ${className}`} source={selectedImage ? { uri: selectedImage } : imgSource} />
}

export default ImageViewer
