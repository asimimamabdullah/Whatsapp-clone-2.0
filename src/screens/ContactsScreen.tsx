import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { ListUsersQuery } from "../API";
import ContactListItem from "../components/ContactListItem/ContactListItem";
import type { GraphQLResult, GraphQLOperation } from "@aws-amplify/api-graphql";

interface UsersProps {
	__typename: "User";
	id: string;
	name: string;
	status?: string | null;
	image?: string | null;
	Messages?: {
		__typename: "ModelMessageConnection";
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	ChatRooms?: {
		__typename: "ModelUserChatRoomConnection";
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	createdAt: string;
	updatedAt: string;
	_version: number;
	_deleted?: boolean | null;
	_lastChangedAt: number;
}

const ContactsScreen = () => {
	const [users, setUsers] = useState<Array<UsersProps | null>>([]);

	useEffect(() => {
		const usersList: Promise<GraphQLResult<any>> = API.graphql(
			graphqlOperation(listUsers as ListUsersQuery),
		);

		usersList.then((res: GraphQLResult<ListUsersQuery>) => {
			setUsers(res.data?.listUsers?.items as Array<UsersProps>);
		});
	}, []);

	return (
		<FlatList
			data={users}
			renderItem={({ item }: { item: any }) => (
				<ContactListItem user={item} />
			)}
			style={{ backgroundColor: "white" }}
		/>
	);
};

export default ContactsScreen;

const styles = StyleSheet.create({});
