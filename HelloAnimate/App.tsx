import { createStaticNavigation, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screen/HomeScreen";
import DetailScreen from "./src/screen/DetailScreen";
import { Text } from "@react-navigation/elements";
import { Alert } from "react-native";
import AnimatedScreen from "./src/screen/AnimatedScreen";
/*
方法                           | 作用
navigate('RouteName', params) | 跳转到某个页面
goBack()                      | 返回上一个页面
replace('RouteName')          | 替换当前页面
reset(...)                    | 重置整个导航栈
*/
const Stack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                title: "标题",
                headerStyle: {
                    backgroundColor: "#F4511E",
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                    fontWeight: 700
                }
            }
        },
        Detail: {
            screen: DetailScreen,
            options: {
                headerRight: () => (
                    <Text onPress={() => Alert.alert("Hello Alert")}>Hello</Text>
                ),
            }
        },
        Animated: {
            screen: AnimatedScreen
        }
    }
})

const Navigation = createStaticNavigation(Stack)

function App(): React.JSX.Element {
    return <Navigation/>
}

export default App