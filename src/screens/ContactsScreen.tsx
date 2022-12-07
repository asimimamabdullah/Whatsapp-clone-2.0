import React, { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import {
	CreateChatRoomMutation,
	CreateUserChatRoomMutation,
	ListUsersQuery,
} from "../API";
import ContactListItem from "../components/ContactListItem/ContactListItem";
import type { GraphQLResult } from "@aws-amplify/api-graphql";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getCommonChatRoomWithUser } from "../services/chatRoomService";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { CognitoUser } from "amazon-cognito-identity-js";
import { UserProps } from "../../types/types";

export interface UsersProps {
	__typename: "User";
	id: string;
	name: string;
	status?: string | null;
	image?: string | null;
	Messages?: {
		__typename: "ModelMessageConnection";
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	ChatRooms?: {
		__typename: "ModelUserChatRoomConnection";
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	createdAt: string;
	updatedAt: string;
	_version: number;
	_deleted?: boolean | null;
	_lastChangedAt: number;
}

const ContactsScreen = () => {
	const [users, setUsers] = useState<Array<UsersProps | null>>([]);

	const navigation: any = useNavigation();

	useEffect(() => {
		const usersList: Promise<GraphQLResult<any>> = API.graphql(
			graphqlOperation(listUsers as ListUsersQuery),
		);

		usersList.then((res: GraphQLResult<ListUsersQuery>) => {
			setUsers(res.data?.listUsers?.items as Array<UsersProps>);
		});
	}, []);

	const createAChatRoomWithTheUser = async (user: UserProps) => {
		// check if we already have a chatroom with user

		const existingChatRoom = await getCommonChatRoomWithUser(user.id);
		if (existingChatRoom) {
			navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
			return;
		}

		// create a new chatroom
		const newChatRoomData = await (API.graphql(
			graphqlOperation(createChatRoom, {
				input: {},
			}),
		) as Promise<GraphQLResult<CreateChatRoomMutation>>);

		if (!newChatRoomData.data?.createChatRoom) {
			console.warn("Error creating the chat error");
		}

		const newChatRoom = newChatRoomData.data?.createChatRoom;

		// Add the clicked user to chatroom

		await (API.graphql(
			graphqlOperation(createUserChatRoom, {
				input: { chatRoomID: newChatRoom?.id, userID: user.id },
			}),
		) as Promise<GraphQLResult<CreateUserChatRoomMutation>>);

		// Add the auth user to chat room

		const authUser = await (Auth.currentAuthenticatedUser() as Promise<
			CognitoUser | any
		>);

		await (API.graphql(
			graphqlOperation(createUserChatRoom, {
				input: {
					chatRoomID: newChatRoom?.id,
					userID: authUser.attributes.sub,
				},
			}),
		) as Promise<GraphQLResult<CreateUserChatRoomMutation>>);

		// navigate to the newly created chatroom

		navigation.navigate("Chat", { id: newChatRoom?.id });
	};

	return (
		<FlatList
			data={users}
			renderItem={({ item }: { item: any }) => (
				<ContactListItem
					user={item}
					onpress={() => createAChatRoomWithTheUser(item)}
				/>
			)}
			style={{ backgroundColor: "white" }}
			ListHeaderComponent={() => (
				<Pressable
					onPress={() => {
						navigation.navigate("New Group");
					}}
					style={{
						flexDirection: "row",
						alignItems: "center",
						padding: 15,
						paddingHorizontal: 20,
					}}>
					<MaterialIcons
						name="group"
						size={24}
						color="royalblue"
						style={{
							marginRight: 20,
							backgroundColor: "gainsboro",
							padding: 7,
							borderRadius: 20,
							overflow: "hidden",
						}}
					/>
					<Text style={{ color: "royalblue", fontSize: 16 }}>
						New Group
					</Text>
				</Pressable>
			)}
		/>
	);
};

export default ContactsScreen;

const styles = StyleSheet.create({});
