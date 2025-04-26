/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @author zsh
 */

<<<<<<< HEAD
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
=======
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Button,
    FlatList,
    Image,
    Platform,
    ScrollView,
    SectionList,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
>>>>>>> e1431e2c0242f7c968f57aaff725e7566ea6c492
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Cat from './Cat';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

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
<<<<<<< HEAD
    const safePadding = '5%';

    return (
        <View style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                style={backgroundStyle}>
                <View style={{ paddingRight: safePadding }}>
                    <Header />
                </View>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        paddingHorizontal: safePadding,
                        paddingBottom: safePadding,
                    }}>
                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.tsx</Text> to change this
                        screen and then come back to see your edits.
                    </Section>
                    <Section title="See Your Changes">
                        <ReloadInstructions />
                    </Section>
                    <Section title="Debug">
                        <DebugInstructions />
                    </Section>
                    <Section title="Learn More">
                        Read the docs to discover what to do next:
                    </Section>
                    <LearnMoreLinks />
                </View>
            </ScrollView>
        </View>
=======
    const logo = {
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        width: 64,
        height: 64,
    };
    return (
        // <FlatList style={{
        //     backgroundColor: "#0F0"
        // }} data={[
        //     { key: "Name" },
        //     { key: "Name1" },
        //     { key: "Name2" },
        // ]}
        //     renderItem={({ item }) => <Text style={{
        //         backgroundColor: Colors.lighter,
        //         marginBottom: 12
        //     }}>{item.key}</Text>}
        // />
        <>
            <SectionList
                sections={[
                    { title: "D", data: ["Tom", "Jack"] },
                    { title: "E", data: ["Tom1", "Jack1"] },
                ]}
                renderItem={({ item }) => <Text>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={{
                    backgroundColor: "#0D0"
                }}>{section.title}</Text>}
                keyExtractor={index => index}
            />
            <Button title='Click' onPress={ () =>
                console.log(`
                    os: ${Platform.OS}
                    version: ${Platform.Version}
                    constants: ${Platform.constants.reactNativeVersion.major}
                `)
            }/>
        </>
        // npx react-native run-android
>>>>>>> e1431e2c0242f7c968f57aaff725e7566ea6c492
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
