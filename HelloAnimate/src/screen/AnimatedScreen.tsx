import { RouteProp } from "@react-navigation/native";
import { Animated, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { RootStackParamList } from "../type/type";
import { Children, ReactNode, useEffect, useRef } from "react";

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>
type FadeInViewProps = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>,
}

const FadeInView = ({ children, style }: FadeInViewProps) => {
    const fadeAnim: Animated.Value = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(
            fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
        }
        ).start()
    }, [fadeAnim])

    return (
        <Animated.View style={[
            style,
            {
                opacity: fadeAnim,
            }
        ]}>
            {children}
        </Animated.View>
    )
}

function AnimatedScreen({ route }: { route: DetailScreenRouteProp }): React.JSX.Element {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "pink",
        }}>
            <Text style={{
                backgroundColor: "skyblue"
            }}>Hello</Text>
            <FadeInView>
                <Text>Hello</Text>
            </FadeInView>
            <Text>Fading In</Text>
        </View>
    )
}

export default AnimatedScreen