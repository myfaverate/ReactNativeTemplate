import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewScreen from "./src/screen/ViewScreen";
import DetailScreen from "./src/screen/DetailScreen";
import { RootStackParamList } from "./src/type/type";
/*
方法                           | 作用
navigate('RouteName', params) | 跳转到某个页面
goBack()                      | 返回上一个页面
replace('RouteName')          | 替换当前页面
reset(...)                    | 重置整个导航栈
*/
const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="View">
                <Stack.Screen name="View" component={ViewScreen}/>
                <Stack.Screen name="Detail" component={DetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App