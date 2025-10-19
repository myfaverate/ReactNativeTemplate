import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, StatusBar, Text, useColorScheme } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const colorScheme = useColorScheme()
    return <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <Text>Hello World1111! colorScheme: {colorScheme}</Text>
        <Button title="跳转到WorldScreen" onPress={() => {
            navigation.navigate("Login", { name: "From HomeScreen" })
            console.log("Hello World Button")
        }} />
    </SafeAreaView>
}