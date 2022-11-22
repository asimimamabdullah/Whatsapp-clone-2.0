import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { ChatProps } from "../../../../types/types";

const ChatListItem = ({ chat }: { chat: any }) => {
	const navigation: any = useNavigation();

	// loop through chat.users.items and find a user that is not useNavigation(authenticateduser)
	const user = chat.users.items[0].user;

	return (
		<Pressable
			style={styles.container}
			onPress={() =>
				navigation.navigate("Chat", { id: chat?.id, name: user?.name })
			}>
			<Image source={{ uri: user?.image }} style={styles.image} />

			<View style={styles.content}>
				<View style={styles.row}>
					<Text numberOfLines={1} style={styles.name}>
						{user?.name}
					</Text>
					<Text style={styles.subTitle}>
						{dayjs(chat.lastMessage?.createdAt).fromNow(true)}
					</Text>
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>
					{chat.lastMessage?.text}
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
