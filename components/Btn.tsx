import { Pressable, StyleSheet, Text, View } from 'react-native'
import { cssInterop } from 'nativewind'
import { FontAwesome } from '@expo/vector-icons'

// cssInterop(Text, { className: 'style' })
// cssInterop(View, { className: 'style' })
// cssInterop(Pressable, { className: 'style' })

interface IBtn {
	text: string
	theme?: 'primary'
	className?: string
	onPress?: () => void
}

const Btn = ({ text, className, theme, onPress }: IBtn) => {
	if (theme === 'primary') {
		return (
			<View style={[styles.buttonContainer, { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}>
				<Pressable
					style={[styles.button, { backgroundColor: '#fff' }]}
					onPress={onPress}>
					<FontAwesome name='picture-o' size={18} color='#25292e' style={styles.buttonIcon} />
					<Text style={[styles.buttonLabel, { color: '#25292e' }]}>{text}</Text>
				</Pressable>
			</View>
		)
	}

	return (
		<View style={styles.buttonContainer}>
			<Pressable style={styles.button} onPress={onPress}>
				<Text style={styles.buttonLabel}>{text}</Text>
			</Pressable>
		</View>
	)
}

export default Btn

const styles = StyleSheet.create({
	buttonContainer: {
		width: 320,
		height: 68,
		marginHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 3,
	},
	buttonIcon: {
		paddingRight: 8,
	},
	button: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonLabel: {
		color: '#fff',
		fontSize: 16,
	},
})
