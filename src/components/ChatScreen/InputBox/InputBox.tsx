import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage } from "../../../graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CreateMessageMutation } from "../../../API";

type Props = {
	chatroomID: string;
};

const InputBox = ({ chatroomID }: Props) => {
	const [text, setText] = useState<string>("");
	const onSend = async () => {
		console.warn("sending a new message: ", text);
		const authUser = await Auth.currentAuthenticatedUser();

		const newMessage = {
			chatroomID,
			text,
			userID: authUser.attributes.sub,
		};

		await (API.graphql(
			graphqlOperation(createMessage, { input: newMessage }),
		) as Promise<GraphQLResult<CreateMessageMutation>>);

		setText("");
	};

	return (
		<View style={styles.container}>
			{/* Icon  */}
			<AntDesign name="plus" size={20} color="royalblue" />
			{/* Text Input  */}
			<TextInput
				style={styles.input}
				onChangeText={setText}
				placeholder="Type your message..."
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
