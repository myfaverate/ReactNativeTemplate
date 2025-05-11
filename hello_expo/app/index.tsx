import { Alert, Text } from 'react-native';
import 'react-native-reanimated';

export default function App() {
    return (
        <>
            <Text style={{
                backgroundColor: "pink",
                borderRadius: 5
            }} onPress={() => {
                Alert.alert("hello", "哈哈哈去")
            }}>Hello</Text>
            <Text>Hell4100ao</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
        </>
    );
}
