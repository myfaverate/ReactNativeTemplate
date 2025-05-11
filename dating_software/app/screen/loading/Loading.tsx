import { ThemedText } from "@/components/ThemedText"
import { useState } from "react"
import { Dialog } from "@rneui/themed";

// TODO loading 弹窗
export default function Loading() {
    const [isVisible, setVisible] = useState(false)
    return (
        <Dialog isVisible={isVisible} children={
            <ThemedText onPress={() => {
                setVisible(!isVisible)
            }}>Hello</ThemedText>
        }></Dialog>
    )
}