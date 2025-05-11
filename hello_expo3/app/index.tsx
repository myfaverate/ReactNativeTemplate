import { Collapsible } from '@/components/Collapsible';
import { HelloWave } from '@/components/HelloWave';
import React, { ReactNode, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { useComposedEventHandler } from 'react-native-reanimated';
const Children: React.FC<{
    message?: string | null,
    style?: StyleProp<TextStyle>,
    children?: ReactNode,
}> = ({ message, style, children }: { message?: string | null, style?: StyleProp<TextStyle>, children?: ReactNode }) => <>
    <Text style={style} >Children message: {message}</Text>
    {children}
</>
const Parent: () => React.JSX.Element = () => {
        useEffect(() => {
        console.log(`${Platform.OS}: 挂载 : Parent`)
        return () => {
            console.log(`${Platform.OS}: 卸载 : Parent`)
        }
    }, [])
    return <View>
        <Text>
            =====Parent=====
        </Text>
        <Children message="sss" style={{
            color: "pink"
        }}>
            <Text>1212</Text>
            <Text>1212</Text>
            <Text>1212</Text>
        </Children>
        <Text>
            =====Parent=====
        </Text>
    </View>
}

export default function App(): React.JSX.Element {
    const [count, setCount] = useState(0)
    // useEffect(() => {
    //     console.log(`${Platform.OS}: 挂载 : ${count}`)
    //     return () => {
    //         console.log(`${Platform.OS}: 卸载 : ${count}`)
    //     }
    // }, [count])
    console.log(`${Platform.OS}: render: ${count}`)
    return (
        <ScrollView>
            <Text>123</Text>
            <Parent></Parent>
            <Text onPress={() => {
                setCount(count + 1)
            }}>text count: {count}</Text>
            {count % 2 == 0 ? <Parent></Parent> : null}
            <HelloWave></HelloWave>
            <Collapsible title='Hello'></Collapsible>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
});