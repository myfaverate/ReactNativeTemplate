// types.ts
export type RootStackParamList = {
    Home: undefined;
    Animated: undefined;
    Settings: undefined;
    Detail: { name: string, age: number, gender: string };
    Profile: { userId: number };
};