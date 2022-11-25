import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import type { CognitoUser } from "amazon-cognito-identity-js";
import type { GraphQLResult } from "@aws-amplify/api-graphql";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

import Navigator from "./src/navigation/Navigator";
import awsmobile from "./src/aws-exports";
import { GetUserQuery, CreateUserMutation } from "./src/API";

Amplify.configure({ ...awsmobile, Analytics: { disabled: true } });
// Amplify.configure(awsmobile);

function App() {
	useEffect(() => {
		const syncUser = async () => {
			// get Auth user
			const authUser: CognitoUser | any =
				await Auth.currentAuthenticatedUser({
					bypassCache: true,
				});

			// query the database using Auth user id (sub)
			const userData = await (API.graphql(
				graphqlOperation(getUser, { id: authUser.attributes.sub }),
			) as Promise<GraphQLResult<GetUserQuery>>);
			if (userData.data?.getUser) {
				return;
			}
			// if there is no user in db, create one
			const newUser = {
				id: authUser.attributes.sub,
				name: authUser.attributes.phone_number,
				// image: ,
				status: "Hey, I am using Whatsapp",
			};

			await (API.graphql(
				graphqlOperation(createUser, { input: newUser }),
			) as Promise<GraphQLResult<CreateUserMutation>>);
			// console.log("after");
		};

		syncUser();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Navigator />
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "whitesmoke",
		justifyContent: "center",
	},
});

export default withAuthenticator(App);
// 398
// 445
// 439
