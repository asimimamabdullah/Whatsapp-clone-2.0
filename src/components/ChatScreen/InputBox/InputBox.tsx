import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

type Props = {};

const InputBox = (props: Props) => {
	const [newMessage, setNewMessage] = useState<string>("");
	const onSend = () => {
		console.warn("send a new message: ", newMessage);
		setNewMessage("");
	};

	return (
		<View style={styles.container}>
			{/* Icon  */}
			<AntDesign name="plus" size={20} color="royalblue" />
			{/* Text Input  */}
			<TextInput
				style={styles.input}
				onChangeText={setNewMessage}
				placeholder="type your message..."
			/>

			{/* Icon  */}
			<MaterialIcons
				onPress={onSend}
				style={styles.send}
				name="send"
				size={16}
				color="white"
			/>
		</View>
	);
};

export default InputBox;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "whitesmoke",
		padding: 5,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	input: {
		flex: 1,
		backgroundColor: "white",
		padding: 5,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		borderRadius: 50,
		borderColor: "lightgray",
		borderWidth: StyleSheet.hairlineWidth,
		// fontSize:16
	},
	send: {
		backgroundColor: "royalblue",
		padding: 7,
		borderRadius: 15,
		overflow: "hidden",
	},
});
