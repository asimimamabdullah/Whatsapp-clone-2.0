import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Message as MessageType } from "../../../API";
import { Auth } from "aws-amplify";

const Message = (props: { message: MessageType | null }) => {
	const [isMe, setIsMe] = useState(false);

	useEffect(() => {
		const isMyMessage = async () => {
			const authUser = await Auth.currentAuthenticatedUser();

			setIsMe(message?.userID === authUser?.attributes?.sub);
		};

		isMyMessage();
	}, []);
	const { message } = props;
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: isMe ? "#DCF8C5" : "white",
					alignSelf: isMe ? "flex-end" : "flex-start",
				},
			]}>
			<Text>{message?.text}</Text>
			<Text style={styles.time}>
				{dayjs(message?.createdAt).fromNow(true)}
			</Text>
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	container: {
		margin: 5,
		padding: 10,
		borderRadius: 10,
		width: "80%",

		// Shadows
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	time: {
		color: "gray",
		alignSelf: "flex-end",
	},
});
