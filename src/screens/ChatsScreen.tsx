import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import chats from "../../assets/data/chats.json";
import ChatListItem from "../components/ChatScreen/ChatListItem/ChatListItem";

type Props = {};

const ChatsScreen = (props: Props) => {
	return (
		<FlatList
			data={chats}
			renderItem={({ item }) => <ChatListItem chat={item} />}
			style={{ backgroundColor: "white" }}
		/>
	);
};

export default ChatsScreen;

const styles = StyleSheet.create({});
