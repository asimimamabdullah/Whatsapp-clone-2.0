import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";

import Navigator from "./src/navigation/Navigator";

Amplify.configure(awsconfig);

export default function App() {
	console.log(Amplify.Storage);
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
		backgroundColor: "red",
		// alignItems: "center",
		justifyContent: "center",
	},
});
