import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { UserProps } from "../../../types/types";
import { CreateChatRoomMutation, CreateUserChatRoomMutation } from "../../API";
import type { GraphQLResult } from "@aws-amplify/api-graphql";
import { CognitoUser } from "amazon-cognito-identity-js";
import {
	getCommonChatRoomWithUser,
	GetUserChatRooms,
} from "../../services/chatRoomService";

const ContactListItem = ({ user }: { user: UserProps }) => {
	const navigation: any = useNavigation();

	const onPress = async () => {
		// check if we already have a chatroom with user

		const existingChatRoom = await getCommonChatRoomWithUser(user.id);
		if (existingChatRoom) {
			navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
			return;
		}

		// create a new chatroom
		const newChatRoomData = await (API.graphql(
			graphqlOperation(createChatRoom, {
				input: {},
			}),
		) as Promise<GraphQLResult<CreateChatRoomMutation>>);

		if (!newChatRoomData.data?.createChatRoom) {
			console.warn("Error creating the chat error");
		}

		const newChatRoom = newChatRoomData.data?.createChatRoom;

		// Add the clicked user to chatroom

		await (API.graphql(
			graphqlOperation(createUserChatRoom, {
				input: { chatRoomID: newChatRoom?.id, userID: user.id },
			}),
		) as Promise<GraphQLResult<CreateUserChatRoomMutation>>);

		// Add the auth user to chat room

		const authUser = await (Auth.currentAuthenticatedUser() as Promise<
			CognitoUser | any
		>);

		await (API.graphql(
			graphqlOperation(createUserChatRoom, {
				input: {
					chatRoomID: newChatRoom?.id,
					userID: authUser.attributes.sub,
				},
			}),
		) as Promise<GraphQLResult<CreateUserChatRoomMutation>>);

		// navigate to the newly created chatroom

		navigation.navigate("Chat", { id: newChatRoom?.id });
	};

	return (
		<Pressable style={styles.container} onPress={onPress}>
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
