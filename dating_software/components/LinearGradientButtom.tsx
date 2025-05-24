import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import { ColorValue, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

type LinearGradientButtonProps = {
    textStyle?: StyleProp<TextStyle>,
    linearGradientStyle?: StyleProp<ViewStyle> | undefined;
    text: string,
    colors: readonly [ColorValue, ColorValue, ...ColorValue[]],
    start?: LinearGradientPoint | null,
    end?: LinearGradientPoint | null,
    onPress?: () => void,
}

export default function LinearGradientButton({
    text,
    textStyle,
    linearGradientStyle,
    start,
    end,
    colors,
    onPress,
}: LinearGradientButtonProps) {
    return (
        <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={linearGradientStyle}
        >
            <Text onPress={onPress} style={textStyle}>{text}</Text>
        </LinearGradient>
    )
}