import { AuthCodeBean, Result, UserInfoBean } from "@/app/bean/result";
import { BASE_URL } from "@/app/utils/constant";
import utils from "@/app/utils/utils";
import LinearGradientButton from "@/components/LinearGradientButtom";
import { ThemedText } from "@/components/ThemedText";
import { Dialog, Input } from "@rneui/themed";
import * as Device from 'expo-device';
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

import * as Haptics from 'expo-haptics';
import Toast from "react-native-toast-message";

import {
    CodeField,
    Cursor
} from 'react-native-confirmation-code-field';
import { useRouter } from "expo-router";

/*
    在键盘弹出状态下，如果用户点击了非输入框区域，则允许这个点击事件传递下去，而不是 ScrollView 自己吃掉。
    'never'	默认值，点击不会关闭键盘，事件也不传递（⚠️ 很容易造成你遇到的问题）
    'always'	总是传递点击事件，关闭键盘
    'handled'	如果目标组件有处理触摸，则允许事件传递，否则 ScrollView 吃掉
*/

type PhoneProps = {
    getPhone: (phone: string) => void
}

function LoginView({ getPhone }: PhoneProps): React.JSX.Element {
    console.log(`LoginView -> ${Platform.OS} ${Device.modelName}`)

    const [phone, setPhone] = useState("")
    const [isValidatePhone, setValidatePhone] = useState(true)

    const [isLoading, setLoading] = useState(false)

    const onSubmit: () => void = () => {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 5000)
        console.log(`${Platform.OS}: confirm phone: ${phone}`)
        const isValidate: boolean = utils.isValidatePhone(phone)
        setValidatePhone(isValidate)
        if (!isValidate) {
            console.log(`手机号无效: ${phone}, isValid: ${isValidate}`)
            return
        }
        setLoading(true)
        fetch(`${BASE_URL}/login/getCode`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "post",
            body: JSON.stringify({
                phone: phone
            }),
            signal: controller.signal
        }).then((response: Response) => {
            (response.json() as Promise<Result<AuthCodeBean>>)
                .then((result: Result<AuthCodeBean>) => {
                    console.log(`${Platform.OS}, success: result: ${JSON.stringify(result)}, code: ${result.data.code}`)
                    setLoading(false)
                    getPhone(phone)
                }).catch((e) => {
                    console.log(`${Platform.OS}, error1: ${JSON.stringify(e)}`)
                    setLoading(false)
                })
        }).catch((e: Error) => {
            if (e.name === 'AbortError') {
                Toast.show({
                    type: "normal",
                    text1: "请求超时",
                    position: "bottom"
                })
            } else {
                console.log(`${Platform.OS}, error2: ${JSON.stringify(e)}`)
            }
            setLoading(false)
        })
    }

    return (
        <>
            {/* 内容开始 */}
            <ThemedText style={styles.loginTitle}>手机号登陆注册</ThemedText>
            {/* 输入框 */}
            <Input
                autoFocus={false}
                maxLength={11}
                keyboardType="phone-pad"
                inputContainerStyle={{
                    marginTop: 30,
                }}
                value={phone}
                inputStyle={{ color: "#333" }}
                onChangeText={(phone: string) => {
                    console.log(`${Platform.OS}: phone: ${phone}`)
                    setPhone(phone)
                }}
                errorMessage={isValidatePhone ? "" : "手机号码格式不正确"}
                onSubmitEditing={onSubmit}
                style={styles.input}
                placeholder="请输入手机号码"
                leftIcon={{ type: "font-awesome", name: "phone", color: "#CCC", size: 20 }}
                containerStyle={{
                    // backgroundColor: "red",
                }}
            />
            <LinearGradientButton
                text="获取验证码"
                colors={["#9b63cd", "#e0708c"]}
                textStyle={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "white",
                    // backgroundColor: "green"
                }}
                linearGradientStyle={{
                    borderRadius: 10,
                    alignSelf: "center",
                    width: "75%",
                    height: 40,
                    justifyContent: "center"
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                onPress={onSubmit}
            />
            {/* loading */}
            <Dialog isVisible={isLoading} overlayStyle={{
                width: 200,
                justifyContent: "center",
                borderRadius: 5,
                alignItems: "center",
            }}>
                <Dialog.Loading loadingProps={{
                    size: "large",
                }} />
                <ThemedText>Loading...</ThemedText>
            </Dialog>
        </>
    )
}

function CodeView({ phone }: { phone: string }): React.JSX.Element {
    const router = useRouter()
    useEffect(() => {
        countDown()
        return () => {}
    }, [])
    const CELL_COUNT = 6;
    const [codeValue, setCodeValue] = useState('');
    const [secondsText, setSecondsText] = useState("重新获取")
    const [isCountDown, setIsCountDown] = useState(false)
    const countDown = () => {
        setIsCountDown(true)
        let seconds = 31
        const timeId = setInterval(() => {
            seconds--
            setSecondsText(`重新获取(${seconds})s`)
            if (seconds <= 0) {
                clearInterval(timeId)
                setSecondsText("重新获取")
                setIsCountDown(false)
            }
        }, 1000)
    }
    const [isLoading, setLoading] = useState(false)
    const onCodeSubmit = () => {
        /*
            1. 校验长度
        */
        if (codeValue.length != CELL_COUNT) {
            Toast.show({
                type: "normal",
                text1: "验证码不正确",
                position: "top"
            })
            return
        }
        // 2. 发送验证码和手机号 /user/loginVerification
        // fetch(`${BASE_URL}/user/loginVerification`)
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 5000)
        setLoading(true)
        fetch(`${BASE_URL}/login/loginVerification`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "post",
            body: JSON.stringify({
                phone: phone,
                code: codeValue
            }),
            signal: controller.signal
        }).then((response: Response) => {
            (response.json() as Promise<Result<UserInfoBean>>)
                .then((result: Result<UserInfoBean>) => {
                    const isNew: boolean = result.data.isNew
                    console.log(`${Platform.OS}, success: result: ${JSON.stringify(result)}, isNew: ${result.data.isNew}`)
                    setLoading(false)
                    if(isNew){
                        router.replace({
                            pathname: "/screen/user/UserInfoScreen",
                        })
                    } else {
                        // 跳转主页
                    }
                }).catch((e) => {
                    console.log(`${Platform.OS}, error1: ${JSON.stringify(e)}`)
                    setLoading(false)
                })
        }).catch((e: Error) => {
            if (e.name === 'AbortError') {
                Toast.show({
                    type: "normal",
                    text1: "请求超时",
                    position: "bottom"
                })
            } else {
                console.log(`${Platform.OS}, error2: ${JSON.stringify(e)}`)
            }
            setLoading(false)
        })
    }
    const onSubmit: () => void = () => {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 5000)
        setLoading(true)
        fetch(`${BASE_URL}/login/getCode`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "post",
            body: JSON.stringify({
                phone: phone
            }),
            signal: controller.signal
        }).then((response: Response) => {
            (response.json() as Promise<Result<AuthCodeBean>>)
                .then((result: Result<AuthCodeBean>) => {
                    console.log(`${Platform.OS}, success: result: ${JSON.stringify(result)}, code: ${result.data.code}`)
                    setLoading(false)
                }).catch((e) => {
                    console.log(`${Platform.OS}, error1: ${JSON.stringify(e)}`)
                    setLoading(false)
                })
        }).catch((e: Error) => {
            if (e.name === 'AbortError') {
                Toast.show({
                    type: "normal",
                    text1: "请求超时",
                    position: "bottom"
                })
            } else {
                console.log(`${Platform.OS}, error2: ${JSON.stringify(e)}`)
            }
            setLoading(false)
        })
    }
    return (
        <>
            {/* loading */}
            <Dialog isVisible={isLoading} overlayStyle={{
                width: 200,
                justifyContent: "center",
                borderRadius: 5,
                alignItems: "center",
            }}>
                <Dialog.Loading loadingProps={{
                    size: "large",
                }} />
                <ThemedText>Loading...</ThemedText>
            </Dialog>
            <ThemedText style={styles.codeTitle}>输入6位验证码</ThemedText>
            <ThemedText style={{
                marginStart: 20,
                color: "#888"
            }} >已发到+86 {phone}</ThemedText>
            <CodeField
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={codeValue}
                onChangeText={setCodeValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <ThemedText
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </ThemedText>
                )}
                onSubmitEditing={onCodeSubmit}
            />
            <LinearGradientButton
                text={secondsText}
                colors={["#9b63cd", "#e0708c"]}
                textStyle={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "white",
                    // backgroundColor: "green"
                }}
                linearGradientStyle={{
                    borderRadius: 10,
                    alignSelf: "center",
                    width: "75%",
                    height: 40,
                    justifyContent: "center",
                    marginTop: 15
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                disabled={isCountDown}
                onPress={() => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    if (isCountDown) {
                        Toast.show({
                            type: "normal",
                            text1: "正在倒计时...",
                            position: "bottom"
                        })
                        return
                    }
                    // 获取验证码
                    countDown()
                    onSubmit()
                }}
            />
            <ThemedText>code: {codeValue}</ThemedText>
        </>
    )
}



export default function LoginScreen(): React.JSX.Element {

    console.log(`LoginScreen -> ${Platform.OS} ${Device.modelName}`)
    const [isLogin, setLogin] = useState(true)

    const [phone, setPhone] = useState("")

    const getPhone: (phone: string) => void = (phone: string) => {
        setLogin(false)
        setPhone(phone)
    }

    const [aspectRadio, setAspectRadio] = useState(1)

    useEffect(() => {
        const { width, height }: { width: number, height: number } = Image.resolveAssetSource(require("../../images/girl.png"));
        console.log(`LoginScreen -> ${Platform.OS} ${Device.modelName}, width1: ${width}, height1: ${height}`)
        setAspectRadio(width / height)
        return () => { }
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                {/* <ThemedText>LoginScreen</ThemedText> */}
                {/* 背景图 */}
                <Image style={[styles.image, { aspectRatio: aspectRadio }]} source={
                    require("../../images/girl.png")
                } resizeMode="contain" />
                {isLogin ? <LoginView getPhone={getPhone} /> : <CodeView phone={phone} />}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: "auto",
        backgroundColor: "pink",
    },
    loginTitle: {
        padding: 20,
        // backgroundColor: "pink",
        fontSize: 25,
        color: "#888",
        fontWeight: "800"
    },
    codeTitle: {
        padding: 20,
        // backgroundColor: "pink",
        fontSize: 25,
        color: "#888",
        fontWeight: "bold"
    },
    input: {
        // marginTop: 30,
        // backgroundColor: "pink",
    },
    codeFieldRoot: {
        // marginTop: 20
        // backgroundColor: "pink"
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        color: "#7d53ea",
    },
    focusCell: {
        borderColor: "#7d53ea",
        color: "#7d53ea",
    },
});
/**
 * https://github.com/expo/expo/issues/37064
 * https://github.com/react-native-community/discussions-and-proposals/issues/904
 * npx expo run:android --variant release
 * https://www.bilibili.com/video/BV1e5411L7VV?spm_id_from=333.788.player.switch&vd_source=fb5fc0881b2bb1a411566e5b2f1c7c7e&p=43
 */