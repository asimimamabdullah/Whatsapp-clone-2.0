import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { MessageProps } from "../../../types/types";

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
	},
	time: {
		color: "gray",
		alignSelf: "flex-end",
	},
});
