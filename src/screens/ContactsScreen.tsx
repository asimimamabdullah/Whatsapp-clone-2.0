import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { chats } from "../../assets/data";
import ContactListItem from "../components/ContactListItem/ContactListItem";
import { ChatProps } from "../../types/types";

type Props = {};

const ContactsScreen = (props: Props) => {
	return (
		<FlatList
			data={chats}
			renderItem={({ item }: { item: ChatProps }) => (
				<ContactListItem user={item.user} />
			)}
			style={{ backgroundColor: "white" }}
		/>
	);
};

export default ContactsScreen;

const styles = StyleSheet.create({});
