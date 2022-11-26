import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../../components/ChatScreen/ChatListItem/ChatListItem";
import { listChatRooms, ListChatRoomsQueryOwn } from "./queries";
import { GetUserQuery, UserChatRoom, ListChatRoomsQuery } from "../../API";

type Props = {};

const ChatsScreen = (props: Props) => {
	const [chatRoom, setChatRoom] = useState<Array<any>>([]);

	useEffect(() => {
		const fetchChatRooms = async () => {
			const authUser = await Auth.currentAuthenticatedUser();

			const response = await (API.graphql(
				graphqlOperation(listChatRooms, { id: authUser.attributes.sub }),
			) as Promise<GraphQLResult<ListChatRoomsQueryOwn>>);

			const rooms = response.data?.getUser?.ChatRooms?.items || [];
			console.log("something: ", response);
			const sortedRooms = rooms.sort(
				(r1, r2) =>
					new Date(r2.chatRoom.updatedAt).valueOf() -
					new Date(r1.chatRoom.updatedAt).valueOf(),
			);

			setChatRoom(sortedRooms);
		};

		fetchChatRooms();
	}, []);

	return (
		<FlatList
			data={chatRoom}
			renderItem={({ item }: { item: UserChatRoom }) => (
				<ChatListItem chat={item.chatRoom} />
			)}
			style={{ backgroundColor: "white" }}
		/>
	);
};

export default ChatsScreen;

const styles = StyleSheet.create({});
