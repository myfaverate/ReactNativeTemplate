import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../type/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 200,
    }
})
type ViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'View'>;
function ViewScreen(): React.JSX.Element {
    const navigation = useNavigation<ViewScreenNavigationProp>()
    return (
        <ScrollView>
            <Image style={styles.img} source={{
                uri: "https://reactnative.cn/img/tiny_logo.png"
            }}></Image>
            <Text>本地图片</Text>
            <Image style={styles.img} source={require("../../assets/images/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image1.webp")}></Image>
            <Image style={styles.img} source={require("../img/hello.gif")}></Image>
            <Button onPressIn={() => {
                 navigation.navigate('Detail', { itemId: 42 })
            }}>跳转详情页1</Button>
        </ScrollView>
    )
}

export default ViewScreen