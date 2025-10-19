import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import HomeScreen from "../home/HomeScreen";
import LoginScreen from "../login/LoginScreen";

console.log("NavigationScreen module loaded");

const RootStack = createNativeStackNavigator<RootStackParamList>({
    initialRouteName: "Home",
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                title: "Home Screen",
                headerShown: false,
            }
        },
        Login: {
            screen: LoginScreen,
            options: {
                title: "Login Screen"
            }
        }
    }
})

const Navigation = createStaticNavigation(RootStack)

export default function NavigationScreen(): React.JSX.Element {
    console.log("NavigationScreen module rendered");
    return <Navigation/>
}