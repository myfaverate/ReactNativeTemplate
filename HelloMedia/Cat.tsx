import React from "react"
import { Text } from "react-native"

const Cat = (props: any) => {
    const name: String = "Mar1"
    return (
        <Text style={{
            fontSize: 20,
            fontFamily: "隶书",
        }}>妈妈 Hello World, I am {name} props: {props.name}!</Text>
    )
}

export default Cat