import { manXml, womanXml } from "@/app/fonts/iconSvg";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Svg from 'react-native-svg';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Keyboard } from "react-native";


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

            <Input
                editable={Platform.OS === "ios" ? false : true}
                onPressIn={() => {
                    setShow(true)
                }}
                value={birthday}
                placeholder="设置生日"
                style={styles.birthday} />

            {show && <DateTimePicker
                value={date}
                display="spinner"
                mode="date"
                minimumDate={new Date(1900, 1, 1)}
                onChange={onChange}
            />}
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

    }
})