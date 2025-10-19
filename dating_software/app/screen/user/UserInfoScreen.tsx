import { manXml, womanXml } from "@/app/fonts/iconSvg";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Input } from "@rneui/themed";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Svg from 'react-native-svg';
import locationService from "@/app/utils/geo"
import { modelName } from "expo-device";
import { Picker } from "@react-native-picker/picker";
import cities from "@/app/res/city.json"


export default function UserInfoScreen() {
    const insets: EdgeInsets = useSafeAreaInsets()
    const [gender, setGender] = useState(true)
    const [nickName, setNickName] = useState("")

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [birthday, setBirthday] = useState("")

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate ?? new Date();
        setShow(false);
        setDate(currentDate);
        setBirthday(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)
        console.log(`${Platform.OS}: timestamp: ${event.nativeEvent.timestamp}, selectedDate: ${JSON.stringify(selectedDate)}`)
    };

    const [city, setCity] = useState("")

    const [selectedLanguage, setSelectedLanguage] = useState();

    const [province, setProvince] = useState(Object.keys(cities)[0]);


    return (
        <ScrollView style={{
            flex: 1,
            paddingTop: insets.top,
            padding: 20,
            backgroundColor: "white"
        }}>
            <ThemedText style={styles.title}>填写资料</ThemedText>
            <ThemedText style={styles.title}>提升我的魅力</ThemedText>
            {/* <Svg.SvgFromXml /> */}
            <ThemedView style={styles.header}>
                <Svg.SvgXml onPress={() => setGender(true)} style={[styles.svg, { backgroundColor: gender ? "red" : "#EEE" }]} xml={manXml} />
                <Svg.SvgXml onPress={() => setGender(false)} style={[styles.svg, { backgroundColor: !gender ? "red" : "#EEE" }]} xml={womanXml} />
            </ThemedView>
            <Input
                value={nickName}
                placeholder="设置昵称"
                onChangeText={(name) => setNickName(name)}
            />

            {/* 1 */}
            <TouchableOpacity onPress={() => {
                setShow(true)
                console.log(`${Platform.OS} ${modelName} onPress...`)
            }}>
                {/* 有意图打开系统控件 */}
                <Input
                    pointerEvents="none"
                    disabled={true}
                    value={birthday}
                    placeholder="设置生日"
                    style={styles.birthday} />
            </TouchableOpacity>

            {show && <DateTimePicker
                value={date}
                display="spinner"
                mode="date"
                minimumDate={new Date(1900, 1, 1)}
                onChange={onChange}
            />}
            {/* <ThemedText onPress={() => {
                console.log(`location...`)
                locationService.getCityLocation1().then(location => {
                    console.log(`${Platform.OS} ${modelName} location: ${location}`)
                })
            }}>获取地理位置</ThemedText> */}
            {/* 2 */}
            <TouchableOpacity onPress={() => {
                console.log(`${Platform.OS} ${modelName} click...`)
            }}>
                <Input
                    onPress={() => {
                        console.log(`${Platform.OS} ${modelName} click...`)
                    }}
                    value={`当前定位: ${city}`}
                    style={{
                        color: "#666"
                    }}
                    disabled={true}
                />
            </TouchableOpacity>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <ThemedText>省份：</ThemedText>

            <Picker>
                {cities.map(city => {
                    const name: string = Object.keys(city)[0]
                    return (
                        <Picker.Item key={name} label={name} value={name} />
                    )
                })}
            </Picker>

            <ThemedText onPress={() => {
                cities.map(city => {
                    // Object.keys(city)[0]
                    console.log(`city: ${JSON.stringify(Object.values(city)[0])}`)
                })
            }}>城市：</ThemedText>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#666",
        fontWeight: "900"
    },
    header: {
        // justifyContent: "space-around",
        flexDirection: "row",
        // backgroundColor: "red",
        alignSelf: "center",
    },
    svg: {
        width: 100,
        height: 100,
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 50,
    },
    birthday: {

    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
})
/*
https://www.bilibili.com/video/BV1e5411L7VV?spm_id_from=333.788.player.switch&vd_source=fb5fc0881b2bb1a411566e5b2f1c7c7e&p=53
*/