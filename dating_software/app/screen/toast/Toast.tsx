import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function CustomToast() {
    return (
        <Toast
            config={{
                loading: () => (
                    <ActivityIndicator animating={true} size="large" color={MD2Colors.red800} />
                ),
                normal: ({ text1 }: { text1?: string }) => (
                    <ThemedText style={{
                        // width: 200,
                        // height: 20,
                        backgroundColor: "#000000",
                        borderRadius: 5,
                        color: "white",
                        opacity: 0.8,
                        textOverflow: "ellipsis"
                    }}>{text1}</ThemedText>
                )
            }}
            position='top' />
    )
}