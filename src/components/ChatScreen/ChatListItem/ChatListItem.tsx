import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// import { ChatProps } from "../../../../types/types";
import { ChatRoom, UserChatRoom } from "../../../API";
import { Auth } from "aws-amplify";

const ChatListItem = ({ chat }: { chat: ChatRoom }) => {
	const navigation: any = useNavigation();

	const [user, setUser] = useState<UserChatRoom | null | undefined>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const authUser = await Auth.currentAuthenticatedUser();

			// loop through chat.users.items and find a user that is not useNavigation(authenticateduser)
			const userItem = chat.users?.items.find(
				(item: any) => item.user.id !== authUser.attributes.sub,
			);
			setUser(userItem);
		};

		fetchUser();
	}, []);

	return (
		<Pressable
			style={styles.container}
			onPress={() =>
				navigation.navigate("Chat", {
					id: chat?.id,
					name: user?.user?.name,
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
					<Text style={styles.subTitle}>
						{dayjs(chat.LastMessage?.createdAt).fromNow(true)}
					</Text>
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>
					{chat.LastMessage?.text}
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
