import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import chats from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatScreen/ChatListItem/ChatListItem";
// import { listChatRooms } from "../../graphql/queries";
import { listChatRooms } from "./queries";
import { GetUserQuery } from "../../API";

type Props = {};

const ChatsScreen = (props: Props) => {
	const [chatRoom, setChatRoom] = useState<Array<any>>([]);

	useEffect(() => {
		const fetchChatRooms = async () => {
			const authUser = await Auth.currentAuthenticatedUser();

			const response = await (API.graphql(
				graphqlOperation(listChatRooms, { id: authUser.attributes.sub }),
			) as Promise<GraphQLResult<GetUserQuery>>);
			// console.log(response.data?.getUser?.ChatRooms?.items);
			setChatRoom(response.data?.getUser?.ChatRooms?.items as Array<{}>);
		};

		fetchChatRooms();
	}, []);

	return (
		<FlatList
			data={chatRoom}
			renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
			style={{ backgroundColor: "white" }}
		/>
	);
};

export default ChatsScreen;

const styles = StyleSheet.create({});
