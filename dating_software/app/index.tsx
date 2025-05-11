import { ThemedText } from "@/components/ThemedText"
import { Redirect, router, useNavigation } from "expo-router"
import { Text } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParams } from "./type/types"
 

type IndexScreenNavigationProp = NativeStackNavigationProp<RootStackParams, "Index">

export default function App() {
    const navigation = useNavigation<IndexScreenNavigationProp>()
    return (
        <>
        <Redirect href="/screen/login/LoginScreen"/>
            {/* <ThemedText onPress={() => {
                navigation.navigate("(tabs)")
            }}>Tabsw</ThemedText>
            <ThemedText onPress={() => {
                router.push({
                    pathname: "/screen/DetailScreen",
                    params: { name: "index Hello 世界" },
                })
            }}>GO TO Detail</ThemedText> */}
        </>
    )
}   