import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import Navigator from "./src/navigation/Navigator";
import awsmobile from "./src/aws-exports";

Amplify.configure({ ...awsmobile, Analytics: { disabled: true } });
// Amplify.configure(awsmobile);

function App() {
	// console.log("user...........................: ", Auth.currentCredentials());
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
