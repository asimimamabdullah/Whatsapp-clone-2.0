import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatListItem from "./src/components/ChatListItem";

interface ChatProps {
	id: string;
	user: {
		id: string;
		name: string;
		image: string;
	};
	lastMessage: {
		id: string;
		text: string;
		createdAt: string;
	};
}

export default function App() {
	const chat: ChatProps = {
		id: "1",
		user: {
			id: "u2",
			name: "Lukas",
			image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
		},
		lastMessage: {
			id: "m1",
			text: "Well done this sprint, guys!",
			createdAt: "2022-10-14T13:30:00.000Z",
		},
	};
	return (
		<View style={styles.container}>
			<ChatListItem chat={chat} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
