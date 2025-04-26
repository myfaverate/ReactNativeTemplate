import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV()

function setName(name: string) {
    storage.set("name", name)
}

function getName(): string {
    return storage.getString("name") ?? "default"
}

const style = StyleSheet.create({
    text: {
        width: 100,
        height: 50,
        padding: 5,
        margin: 5,
        backgroundColor: "pink"
    }
})

function MMkVScreen(): React.JSX.Element {
    let [name, setNameValue] = useState(0)
    return (
        <ScrollView>
            <Text style={style.text} >ViewScreen</Text>
            <Text  style={style.text}  onPress={() => {
                setName(`${name}`)
                setNameValue(name ++ )
            }}>存储值</Text>
            <Text  style={style.text}  onPress={() => {
                console.log(getName())
            }}>读取值</Text>
        </ScrollView>
    )
}

export default MMkVScreen