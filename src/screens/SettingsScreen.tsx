import { Button, StyleSheet, Text, View } from "react-native";
import { Auth } from "aws-amplify";

type Props = {};

const SettingsScreen = (props: Props) => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Button onPress={() => Auth.signOut()} title="Sign out" />
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({});
