import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, Platform } from 'react-native'
const PlaceholderImage = require('@/assets/images/background-image.png')
import { cssInterop } from 'nativewind'
import ImageViewer from '@/components/ImageViewer'
import Btn from '@/components/Btn'
cssInterop(Image, { className: 'style' })
import domtoimage from 'dom-to-image'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import IconButton from '@/components/IconButton'
import CircleButton from '@/components/CircleButton'
import EmojiPicker from '@/components/EmojiPicker'
import EmojiList from '@/components/EmojiList'
import EmojiSticker from '@/components/EmojiSticker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
	const [pickedEmoji, setPickedEmoji] = useState<string | undefined>(undefined)
	const [status, requestPermission] = MediaLibrary.usePermissions()
	const imageRef = useRef<View>(null)

	if (status === null) {
		requestPermission()
	}

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		})
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri)
			setShowAppOptions(true)
		} else {
			alert('You did not select any image.')
		}
	}

	const onReset = () => {
		setShowAppOptions(false)
	}

	const onAddSticker = () => {
		setIsModalVisible(true)
	}

	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				})

				await MediaLibrary.saveToLibraryAsync(localUri)
				if (localUri) {
					alert('Saved!')
				}
			} catch (e) {
				console.log(e)
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current as any, {
					quality: 0.95,
					width: 320,
					height: 440,
				})
				let link = document.createElement('a')
				link.download = 'sticker-smash.jpeg'
				link.href = dataUrl
				link.click()
			} catch (error) {
				console.error(error)
			}
		}
	}

	const onModalClose = () => {
		setIsModalVisible(false)
	}

	return (
		<>
		   <GestureHandlerRootView style={styles.container}>
   			<View className={`view bg-gray-800`}>
   				<Text className={`text-5xl font-bold mb-5`}>Salam Bayram</Text>
   				<Link className={`text-3xl text-blue-500 mb-5`} href={'/about'}>
   					Go to About Screen
   				</Link>
   
   				<View className={`flex-1 w-full`} ref={imageRef} collapsable={false}>
   					<ImageViewer
   						className={`max-h-[440px] h-full max-w-[320px] mx-auto rounded-xl`}
   						imgSource={PlaceholderImage}
   						selectedImage={selectedImage}
   					/>
   					{pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
   				</View>
   
   				{showAppOptions && (
   					<View style={styles.optionsContainer}>
   						<View style={styles.optionsRow}>
   							<IconButton icon='refresh' label='Reset' onPress={onReset} />
   							<CircleButton onPress={onAddSticker} />
   							<IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
   						</View>
   					</View>
   				)}
   
   				<View className={`basis-1/3 ${showAppOptions ? 'hidden' : ''}`}>
   					<Btn theme='primary' text='Choose a photo' onPress={pickImageAsync} />
   					<Btn text='Use this photo' onPress={() => setShowAppOptions(true)} />
   				</View>
   
   				<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
   					<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
   				</EmojiPicker>
   			</View>
   		</GestureHandlerRootView>
         <StatusBar style="light" />
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
	},
	imageContainer: {
		flex: 1,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
})
