import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import chats from "../../../assets/data/chats.json";
import ChatListItem from "../ChatListItem/ChatListItem";

type Props = {};

const ChatsScreen = (props: Props) => {
	return <FlatList data={chats} renderItem={({ item }) => <ChatListItem chat={item} />} />;
};

export default ChatsScreen;

const styles = StyleSheet.create({});
