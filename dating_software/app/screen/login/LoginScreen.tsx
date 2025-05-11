import { AuthCodeBean, Result } from "@/app/bean/result";
import { BASE_URL } from "@/app/utils/constant";
import utils from "@/app/utils/utils";
import { ThemedText } from "@/components/ThemedText";
import { Dialog, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";




export default function LoginScreen(): React.JSX.Element {
    const [phone, setPhone] = useState("")
    const [isValidatePhone, setValidatePhone] = useState(true)

    const [isVisible, setVisible] = useState(true)

    useEffect(() => {
        const image = Image.resolveAssetSource(require("../../images/girl.png"))
        console.log(`${Platform.OS}: width: ${image.width}, height: ${image.height}, uri: ${image.uri}`)
    }, [])
    return (
        <ScrollView>
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
                inputContainerStyle={{ marginTop: 30 }}
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
                            })
                        // response.text().then((text: string) => {
                        //     console.log(`${Platform.OS}, success: text: ${text}`)
                        // })
                    }).catch((e) => {
                        console.log(`${Platform.OS}, error: ${JSON.stringify(e)}`)
                    })
                }}
                style={styles.input}
                placeholder="请输入手机号码"
                leftIcon={{ type: "font-awesome", name: "phone", color: "#CCC", size: 20 }}
            />
            {/* snackBar */}
            <Dialog overlayStyle={{
                width: 200,
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#CCC', borderRadius: 10,
            }} isVisible={isVisible} children={
                <>
                    <ActivityIndicator style={{
                        height: 100
                    }} size={"large"} color="black" />
                    <ThemedText>Loading...</ThemedText>
                </>
            }></Dialog>
        </ScrollView>
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
 * https://www.bilibili.com/video/BV1e5411L7VV?spm_id_from=333.788.player.switch&vd_source=fb5fc0881b2bb1a411566e5b2f1c7c7e&p=37
 */