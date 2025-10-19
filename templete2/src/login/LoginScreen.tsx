import { Text } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function LoginScreen(): React.JSX.Element {
    const route = useRoute<RouteProp<RootStackParamList>>()
    const name = route.params?.name ?? "Unknown"
    return <>
        <Text>Login Screen name: {name}</Text>
    </>
}