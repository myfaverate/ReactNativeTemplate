import { RouteProp, useNavigation } from "@react-navigation/native";
import { ScrollView, Text } from "react-native";
import { RootStackParamList } from "../type/type";
import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>

function DetailScreen({ route }: { route: DetailScreenRouteProp }): React.JSX.Element {
    const {name, age, gender}: { name: string, age: number, gender: string } = route.params
    console.log(`name: ${name}, age: ${age}, gender: ${gender}, key: ${route.key}, name: ${route.name}, params: ${route.params}, path: ${route.path}`)
    const navigation = useNavigation<DetailScreenNavigationProp>()
    return (
        <ScrollView>
            <Text>DetailScreen</Text>
            <Button
                onPressIn={() => {
                    navigation.navigate('Animated')
                }}
            >跳转动画页面</Button>
        </ScrollView>
    )
}

export default DetailScreen