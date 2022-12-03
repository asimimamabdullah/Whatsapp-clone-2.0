import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { ChatRoom, UserChatRoom } from "../../../API";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../../graphql/subscriptions";

const ChatListItem = ({ chat }: { chat: ChatRoom }) => {
	const navigation: any = useNavigation();

	const [user, setUser] = useState<UserChatRoom | null | undefined>(null);
	const [chatRoom, setChatRoom] = useState(chat);

	useEffect(() => {
		const fetchUser = async () => {
			const authUser = await Auth.currentAuthenticatedUser();

			// loop through chat.users.items and find a user that is not useNavigation(authenticateduser)
			const userItem = chatRoom.users?.items.find(
				(item: any) => item.user.id !== authUser.attributes.sub,
			);
			setUser(userItem);
		};

		fetchUser();
	}, []);

	// fetch chat room
	useEffect(() => {
		const subs: any = API.graphql(
			graphqlOperation(onUpdateChatRoom, {
				filter: { id: { eq: chat.id } },
			}),
		);
		const subscription = subs.subscribe({
			next: ({ value }: any) => {
				setChatRoom((cr) => ({
					...(cr || {}),
					...value.data.onUpdateChatRoom,
				}));
			},
			error: (err: any) => console.warn(err),
		});

		return () => subscription.unsubscribe();
	}, [chat.id]);

	return (
		<Pressable
			style={styles.container}
			onPress={() =>
				navigation.navigate("Chat", {
					id: chatRoom?.id,
					name: user?.user.name,
				})
			}>
			<Image
				source={{ uri: user?.user?.image as string | undefined }}
				style={styles.image}
			/>

			<View style={styles.content}>
				<View style={styles.row}>
					<Text numberOfLines={1} style={styles.name}>
						{user?.user?.name}
					</Text>
					{chatRoom.LastMessage && (
						<Text style={styles.subTitle}>
							{dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
						</Text>
					)}
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>
					{chatRoom.LastMessage?.text}
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5,
		height: 70,
	},
	image: {
		height: 60,
		width: 60,
		marginRight: 10,
		borderRadius: 30,
	},
	content: {
		flex: 1,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "lightgray",
	},
	row: { flexDirection: "row" },
	name: { flex: 1, fontWeight: "bold" },
	subTitle: { color: "gray" },
});

export default ChatListItem;
