import React from "react";
import { StyleSheet, ImageBackground, FlatList } from "react-native";
import Message from "../Message/Message";
import bg from "../../../assets/images/BG.png";
import { messages } from "../../../assets/data";

type Props = {};

const ChatScreen = (props: Props) => {
	return (
		<ImageBackground source={bg} style={{ ...styles.bg }}>
			<FlatList data={messages} renderItem={({ item }) => <Message message={item} />} style={styles.list} inverted />
		</ImageBackground>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	bg: {
		flex: 1,
	},
	list: {
		padding: 10,
	},
});
