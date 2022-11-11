import { Text, View, Image, StyleSheet } from "react-native";
import chats from "../../../assets/data/chats.json";

const ChatListItem = () => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: chats[0].user.image }} style={styles.image} />

			<View style={styles.content}>
				<View style={styles.row}>
					<Text numberOfLines={1} style={styles.name}>
						{chats[0].user.name}
					</Text>
					<Text style={styles.subTitle}>{chats[0].lastMessage.createdAt}</Text>
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>
					{chats[0].lastMessage.text}
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
