import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	ImageBackground,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { getChatRoom, listMessagesByChatRoom } from "../graphql/queries";
import Message from "../components/ChatScreen/Message/Message";
import bg from "../../assets/images/BG.png";
import { messages } from "../../assets/data";
import InputBox from "../components/ChatScreen/InputBox/InputBox";
import { GraphQLResult, GraphQLOperation } from "@aws-amplify/api-graphql";
import {
	ChatRoom,
	GetChatRoomQuery,
	Message as MessageType,
	ListMessagesByChatRoomQuery,
} from "../API";
import { onCreateMessage } from "../graphql/subscriptions";
import { OnCreateMessageSubscription } from "../API";

const ChatScreen = () => {
	const [chatRoom, setChatRoom] = useState<ChatRoom | null | undefined>(null);
	const [messages, setMessages] = useState<Array<MessageType | null> | null>(
		[],
	);
	const route = useRoute<any>();
	const navigation = useNavigation();

	const chatroomID = route.params.id;

	// fetch chat room
	useEffect(() => {
		const chatrooms: Promise<GraphQLResult<any>> = API.graphql(
			graphqlOperation(getChatRoom as GetChatRoomQuery, {
				id: chatroomID,
			}),
		);
		chatrooms.then((result: GraphQLResult<GetChatRoomQuery>) =>
			setChatRoom(result.data?.getChatRoom as ChatRoom),
		);
	}, [chatroomID]);

	// fetch messages
	useEffect(() => {
		const chatrooms: Promise<GraphQLResult<any>> = API.graphql(
			graphqlOperation(
				listMessagesByChatRoom as ListMessagesByChatRoomQuery,
				{
					chatroomID,
					sortDirection: "DESC",
				},
			),
		);

		// chatrooms.then((result) => setChatRoom(result.data.getChatRoom));
		chatrooms.then((result: GraphQLResult<ListMessagesByChatRoomQuery>) =>
			setMessages(
				result.data?.listMessagesByChatRoom?.items as Array<MessageType>,
			),
		);

		// subscribe to new messages
		const subs: any = API.graphql(graphqlOperation(onCreateMessage));
		subs.subscribe({
			next: ({ value }: any) => {
				console.log("value: ", value);
			},
			error: (err: any) => console.log(err),
		});
	}, [chatroomID]);

	useEffect(() => {
		navigation.setOptions({ title: route.params.name });
	}, [route.params.name]);

	if (!chatRoom) {
		return <ActivityIndicator />;
	}

	return (
		<ImageBackground source={bg} style={{ ...styles.bg }}>
			<FlatList
				data={messages}
				renderItem={({ item }) => <Message message={item} />}
				style={styles.list}
				inverted
			/>
			<InputBox chatroom={chatRoom} />
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
