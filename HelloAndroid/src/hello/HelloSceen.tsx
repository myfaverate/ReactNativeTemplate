import { StyleSheet, Text } from "react-native";
import HelloModule from "../module/HelloModule";
import { use, useEffect } from "react";

export default function HelloScreen() {
    useEffect(() => {
        
        return () => {

        }
    })
    return <>
        <Text style={styles.title} onPress={() => {
            HelloModule.requestPermission().then(res => {
                console.log("Permission result:", res);
            }).catch(err => {
                console.error("Permission error:", err);
            })
        }}>Hello World</Text>
    </>
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: "pink",
        padding: 10,
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        borderRadius: 5,
    }
});