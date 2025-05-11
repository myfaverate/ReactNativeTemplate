import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import CustomToast from './screen/toast/Toast';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName="index" >
                <Stack.Screen name="index" />
                <Stack.Screen name="screen/login/LoginScreen" options={{
                    title: "Login",
                    headerShown: false
                }} />
                <Stack.Screen name="screen/DetailScreen" options={{
                    title: "Detail1",
                    // header
                    // headerShown: false
                    headerStyle: {
                        backgroundColor: "pink"
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: "900"
                    }
                }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
            <CustomToast/>
        </ThemeProvider>
    );
}
