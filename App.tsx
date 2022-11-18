import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import type { CognitoUser } from "amazon-cognito-identity-js";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

import Navigator from "./src/navigation/Navigator";
import awsmobile from "./src/aws-exports";

Amplify.configure({ ...awsmobile, Analytics: { disabled: true } });
// Amplify.configure(awsmobile);

function App() {
	// console.log("user..........................	.: ", Auth.currentCredentials());

	useEffect(() => {
		const syncUser = async () => {
			// get Auth user
			const authUser: CognitoUser | any =
				await Auth.currentAuthenticatedUser({
					bypassCache: true,
				});
			console.log("auth user: ", authUser.attributes.sub);

			// query the database using Auth user id (sub)
			const userData: any = await API.graphql(
				graphqlOperation(getUser, { id: authUser.attributes.sub }),
			);
			console.log("user data: ", userData);
			if (userData.data.getUser) {
				console.log("user already exists in DB");
				return;
			}
			// if there is no user in db, create one
			const newUser = {};

			const newUserResponse = await API.graphql(
				graphqlOperation(createUser, { variables: { input: newUser } }),
			);
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
