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
        <Redirect href="/screen/user/UserInfoScreen"/>
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

/**
 * https://www.bilibili.com/video/BV1e5411L7VV?spm_id_from=333.788.player.switch&vd_source=fb5fc0881b2bb1a411566e5b2f1c7c7e&p=49
 */