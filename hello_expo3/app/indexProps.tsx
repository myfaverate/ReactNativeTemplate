import React, { ReactNode } from 'react';
import { Platform, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
const Children: React.FC<{ 
    message?: string | null,
    style?: StyleProp<TextStyle>,
    children?: ReactNode,
}> = ({ message, style, children }: { message?: string | null, style?: StyleProp<TextStyle>, children?: ReactNode }) => <>
    <Text style={style} >Children message: {message}</Text>
    {children}
</>
const Parent: () => React.JSX.Element = () => <View>
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

export default function App(): React.JSX.Element {
    return (
        <ScrollView>
            <Text>123</Text>
            <Parent></Parent>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
});
