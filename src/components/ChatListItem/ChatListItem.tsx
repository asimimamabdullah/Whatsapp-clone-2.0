import { Text, View, Image, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// import chats from "../../../assets/data/chats.json";
import { ChatProps } from "../../../types/types";

const ChatListItem = ({ chat }: { chat: ChatProps }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: chat.user.image }} style={styles.image} />

			<View style={styles.content}>
				<View style={styles.row}>
					<Text numberOfLines={1} style={styles.name}>
						{chat.user.name}
					</Text>
					<Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>
					{chat.lastMessage.text}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flexDirection: "row", marginHorizontal: 10, marginVertical: 5, height: 70 },
	image: {
		height: 60,
		width: 60,
		marginRight: 10,
		borderRadius: 30,
	},
	content: { flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "lightgray" },
	row: { flexDirection: "row" },
	name: { flex: 1, fontWeight: "bold" },
	subTitle: { color: "gray" },
});

export default ChatListItem;
