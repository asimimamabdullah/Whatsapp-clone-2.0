import React, { useState, useEffect } from "react";
import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem/ContactListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";

import { useNavigation } from "@react-navigation/native";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CreateChatRoomMutation, ListUsersQuery } from "../API";
import { UsersProps } from "./ContactsScreen";

const NewGroupScreen = () => {
	const [users, setUsers] = useState<Array<UsersProps | null>>([]);
	const [selectedUserIds, setSelectedUserIds] = useState<Array<string>>([]);
	const [name, setName] = useState("");

	const navigation: any = useNavigation();

	useEffect(() => {
		const usersList: Promise<GraphQLResult<any>> = API.graphql(
			graphqlOperation(listUsers as ListUsersQuery),
		);

		usersList.then((res: GraphQLResult<ListUsersQuery>) => {
			setUsers(res.data?.listUsers?.items as Array<UsersProps>);
		});
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					title="Create"
					disabled={!name || selectedUserIds.length < 1}
					onPress={onCreateGroupPress}
				/>
			),
		});
	}, [name, selectedUserIds]);

	const onCreateGroupPress = async () => {
		// Create a new Chatroom
		const newChatRoomData = await (API.graphql(
			graphqlOperation(createChatRoom, { input: { name } }),
		) as Promise<GraphQLResult<CreateChatRoomMutation>>);
		if (!newChatRoomData.data?.createChatRoom) {
			console.log("Error creating the chat error");
		}
		const newChatRoom = newChatRoomData.data?.createChatRoom;

		// Add the selected users to the ChatRoom

		await Promise.all(
			selectedUserIds.map((userID) =>
				API.graphql(
					graphqlOperation(createUserChatRoom, {
						input: { chatRoomID: newChatRoom?.id, userID },
					}),
				),
			),
		);

		// Add the auth user to the ChatRoom
		const authUser = await Auth.currentAuthenticatedUser();
		await (API.graphql(
			graphqlOperation(createUserChatRoom, {
				input: {
					chatRoomID: newChatRoom?.id,
					userID: authUser.attributes.sub,
				},
			}),
		) as Promise<GraphQLResult<CreateChatRoomMutation>>);

		setSelectedUserIds([]);
		setName("");
		// navigate to the newly created ChatRoom
		navigation.navigate("Chat", { id: newChatRoom?.id });
	};

	const onContactPress = (id: string) => {
		setSelectedUserIds((userIds) => {
			if (userIds.includes(id)) {
				// remove id from selected
				return [...userIds].filter((uid) => uid !== id);
			} else {
				// add id to selected
				return [...userIds, id];
			}
		});
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Group name"
				value={name}
				onChangeText={setName}
				style={styles.input}
			/>
			<FlatList
				data={users}
				renderItem={({ item }: { item: any }) => (
					<ContactListItem
						user={item}
						// selectable
						// onPress={() => onContactPress(item.id)}
						// isSelected={selectedUserIds.includes(item.id)}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { backgroundColor: "white" },
	input: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: "lightgray",
		padding: 10,
		margin: 10,
	},
});

export default NewGroupScreen;
