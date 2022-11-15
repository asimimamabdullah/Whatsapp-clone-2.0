import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const NotImplemented = (props: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Not Implemented</Text>
			<Image
				source={{
					uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/capybara+copy.png",
				}}
				style={styles.image}
				resizeMode="contain"
			/>
		</View>
	);
};

export default NotImplemented;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "500",
		color: "gray",
	},
	image: {
		width: "80%",
		aspectRatio: 2 / 1,
	},
});
