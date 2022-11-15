import React, { useEffect } from "react";
import { StyleSheet, ImageBackground, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../components/ChatScreen/Message/Message";
import bg from "../../assets/images/BG.png";
import { messages } from "../../assets/data";
import InputBox from "../components/ChatScreen/InputBox/InputBox";

const ChatScreen = () => {
	const route: any = useRoute();
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({ title: route.params.name });
	}, [route.params.name]);

	return (
		<ImageBackground source={bg} style={{ ...styles.bg }}>
			<FlatList
				data={messages}
				renderItem={({ item }) => <Message message={item} />}
				style={styles.list}
				inverted
			/>
			<InputBox />
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
