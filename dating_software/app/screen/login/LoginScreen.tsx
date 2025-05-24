import { AuthCodeBean, Result } from "@/app/bean/result";
import { BASE_URL } from "@/app/utils/constant";
import utils from "@/app/utils/utils";
import LinearGradientButton from "@/components/LinearGradientButtom";
import { ThemedText } from "@/components/ThemedText";
import { Dialog, Input } from "@rneui/themed";
import * as Device from 'expo-device';
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

/*
在键盘弹出状态下，如果用户点击了非输入框区域，则允许这个点击事件传递下去，而不是 ScrollView 自己吃掉。
'never'	默认值，点击不会关闭键盘，事件也不传递（⚠️ 很容易造成你遇到的问题）
'always'	总是传递点击事件，关闭键盘
'handled'	如果目标组件有处理触摸，则允许事件传递，否则 ScrollView 吃掉
*/

export default function LoginScreen(): React.JSX.Element {
    const [phone, setPhone] = useState("")
    const [isValidatePhone, setValidatePhone] = useState(true)

    const [isVisible, setVisible] = useState(false)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                {/* <ThemedText>LoginScreen</ThemedText> */}
                {/* 背景图 */}
                <Image style={styles.image} source={
                    require("../../images/girl.png")
                } />
                {/* 内容开始 */}
                <ThemedText style={styles.loginTitle}>手机号登陆注册</ThemedText>
                {/* 输入框 */}
                <Input
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
                    onSubmitEditing={() => {
                        console.log(`${Platform.OS}: confirm phone: ${phone}`)
                        const isValidate: boolean = utils.isValidatePhone(phone)
                        setValidatePhone(isValidate)
                        if (!isValidate) {
                            console.log(`手机号无效: ${phone}, isValid: ${isValidate}`)
                            return
                        }
                        fetch(`${BASE_URL}/login`, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            method: "post",
                            body: JSON.stringify({
                                phone: phone
                            })
                        }).then((response: Response) => {
                            (response.json() as Promise<Result<AuthCodeBean>>)
                                .then((result: Result<AuthCodeBean>) => {
                                    console.log(`${Platform.OS}, success: result: ${JSON.stringify(result)}, code: ${result.data.code}`)
                                }).catch((e) => {
                                    console.log(`${Platform.OS}, error1: ${JSON.stringify(e)}`)
                                })
                            // response.text().then((text: string) => {
                            //     console.log(`${Platform.OS}, success: text: ${text}`)
                            // })
                            // response.json().then((result) => {
                            //     console.log(`${Platform.OS}, success: result: ${JSON.stringify(result)}`)
                            // })
                        }).catch((e) => {
                            console.log(`${Platform.OS}, error2: ${JSON.stringify(e)}`)
                        })
                    }}
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
                    onPress={() => {
                        console.log(`${Platform.OS}: ${Device.manufacturer}: ${Device.modelName} click...`)
                        // console.log("click")
                    }}
                />
                {/* snackBar */}
                <Dialog isVisible={isVisible} overlayStyle={{
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
    },
    loginTitle: {
        padding: 20,
        // backgroundColor: "pink",
        fontSize: 25,
        color: "#888",
        fontWeight: "800"
    },
    input: {
        // marginTop: 30,
        // backgroundColor: "pink",
    }
});
/**
 * npx expo run:android --variant release
 * https://www.bilibili.com/video/BV1e5411L7VV?spm_id_from=333.788.player.switch&vd_source=fb5fc0881b2bb1a411566e5b2f1c7c7e&p=39
 */