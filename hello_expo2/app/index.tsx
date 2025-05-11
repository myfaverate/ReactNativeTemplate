import { useState } from 'react';
import { Alert, Switch, Text, ToastAndroid } from 'react-native';
import 'react-native-reanimated';


export default function App() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let count = 0
    return (
        <>
            <Text onPress={() => {
                // Alert.prompt("Hello", "aaa")
                console.log(`hello: ${count}`)
                count ++ 
            }} style={{
                fontSize: 18,
                fontStyle: "italic",
                backgroundColor: "skyblue",
                borderRadius: 5
            }}>
                Hello World01
            </Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0f0'}}
                thumbColor={isEnabled ? '#f5d040' : '#f4f3f0'}
                ios_backgroundColor="#000e00"
                onValueChange={toggleSwitch}
                value={isEnabled}
        />
        </>
    );
}
// https://www.bilibili.com/video/BV1e5411L7VV?spm_id_from=333.788.player.switch&vd_source=fb5fc0881b2bb1a411566e5b2f1c7c7e&p=8