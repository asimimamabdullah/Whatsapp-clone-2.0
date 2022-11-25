import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../../graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { ChatRoom, CreateMessageMutation } from "../../../API";

type Props = {
	chatroom: ChatRoom;
};

const InputBox = ({ chatroom }: Props) => {
	const [text, setText] = useState<string>("");
	const onSend = async () => {
		if (text.length > 0) {
			const authUser = await Auth.currentAuthenticatedUser();

			const newMessage = {
				chatroomID: chatroom.id,
				text,
				userID: authUser.attributes.sub,
			};

			const newMessageData = await (API.graphql(
				graphqlOperation(createMessage, { input: newMessage }),
			) as Promise<GraphQLResult<CreateMessageMutation>>);

			setText("");

			// set the new message as LastMessage of the chatroom
			await API.graphql(
				graphqlOperation(updateChatRoom, {
					input: {
						_version: chatroom._version,
						chatRoomLastMessageId: newMessageData.data?.createMessage?.id,
						id: chatroom.id,
					},
				}),
			);
		}
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
				value={text}
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
