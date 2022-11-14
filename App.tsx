import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListItem from "./src/components/ChatListItem/ChatListItem";
import { ChatProps } from "./types/types";
import ChatsScreen from "./src/components/screens/ChatsScreen";
import ChatScreen from "./src/components/screens/ChatScreen";

export default function App() {
	// const chat: ChatProps = {
	// 	id: "1",
	// 	user: {
	// 		id: "u2",
	// 		name: "Lukas",
	// 		image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
	// 	},
	// 	lastMessage: {
	// 		id: "m1",
	// 		text: "Well done this sprint, guys!",
	// 		createdAt: "2022-10-14T13:30:00.000Z",
	// 	},
	// };
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				{/* <ChatsScreen /> */}
				<ChatScreen />
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// alignItems: "center",
		justifyContent: "center",
	},
});
