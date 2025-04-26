import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Text, View } from "react-native"
import { RootStackParamList } from "../type/type"

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    return (
        <>
            <Text>HomeScreen</Text>
            <View style={{
                backgroundColor: "skyblue",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Text onPress={() => {
                    navigation.navigate('MMkV')
                }} style={{
                    backgroundColor: "pink",
                }}>跳到MMkv页面</Text>
                <Text onPress={() => {
                    navigation.setOptions({ title: "a标题" })
                }} style={{
                    backgroundColor: "pink",
                }}>更新标题</Text>
            </View>
        </>
    )
}

export default HomeScreen