import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";

export default function DetailScreen() {
    const params = useLocalSearchParams<{ name: string }>()
    return (
        <>
            <ThemedText>DetailScreen</ThemedText>
            <ThemedText>params: {params.name}</ThemedText>
        </>
    )
}