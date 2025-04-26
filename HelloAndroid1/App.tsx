/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @author zsh
 */

import type { PropsWithChildren } from 'react';
import React from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import HelloModule from './src/module/HelloModule';

type SectionProps = PropsWithChildren<{
    title: string;
}>;
// ReactNativeTemplate
function Section({ children, title }: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    /*
     * To keep the template simple and small we're adding padding to prevent view
     * from rendering under the System UI.
     * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
     * https://github.com/AppAndFlow/react-native-safe-area-context
     *
     * You can read more about it here:
     * https://github.com/react-native-community/discussions-and-proposals/discussions/827
     */
    const logo = {
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        width: 64,
        height: 64,
    };
    function hello(){
        HelloModule.getName("zshhh")
        HelloModule.getNameWithPromise(false)
        .then((response: string) => {
            console.log(`response: ${response}`)
        })
        .catch((error: { message: string }) => {
            console.error(error.message)
        })
        HelloModule.getNameWithPromise(true)
        .then((response: string) => {
            console.log(`response: ${response}`)
        })
        .catch((error: { message: string }) => {
            console.error(error.message)
        })
    }
    return (
        <>
            <Text onPress={(event) => {
                hello()
            }}>Hello11</Text>
        </>
        // npx react-native run-android
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
