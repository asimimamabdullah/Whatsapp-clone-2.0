import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { UserProps } from "../../../types/types";

const ContactListItem = ({ user }: { user: UserProps }) => {
	const navigation: any = useNavigation();

	return (
		<Pressable style={styles.container} onPress={() => {}}>
			<Image source={{ uri: user.image }} style={styles.image} />

			<View style={styles.content}>
				<Text numberOfLines={1} style={styles.name}>
					{user.name}
				</Text>
				<Text numberOfLines={2} style={styles.subTitle}>
					{user?.status}
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
		alignItems: "center",
	},
	image: {
		height: 60,
		width: 60,
		marginRight: 10,
		borderRadius: 30,
	},

	name: { flex: 1, fontWeight: "bold" },
	subTitle: { color: "gray" },
	content: { flex: 1 },
});

export default ContactListItem;
