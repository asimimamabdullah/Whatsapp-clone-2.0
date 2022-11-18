import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { MessageProps } from "../../../../types/types";
// import { Message } from "../../../API";

const Message = (props: { message: MessageProps }) => {
	const isMyMessage = () => {
		return message.user.id === "u1";
	};
	const { message } = props;
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
					alignSelf: isMyMessage() ? "flex-end" : "flex-start",
				},
			]}>
			<Text>{message.text}</Text>
			<Text style={styles.time}>
				{dayjs(message.createdAt).fromNow(true)}
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
