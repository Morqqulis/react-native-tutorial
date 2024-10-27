import { Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const NotFound = () => {
	return (
		<>
			<Stack.Screen options={{ title: 'OOPS! Not Found' }} />
			<View className={`view`}>
				<Text>Not Found</Text>
			</View>
		</>
	)
}

export default NotFound
