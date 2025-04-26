import { useNavigation } from "@react-navigation/native"
import { Text, ToastAndroid, View } from "react-native"
import { RootStackParamList } from "../type/type"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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
                    navigation.navigate('Detail', { name: "zsh", age: 18, gender: "男" })
                }} style={{
                    backgroundColor: "pink",
                }}>Content</Text>
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