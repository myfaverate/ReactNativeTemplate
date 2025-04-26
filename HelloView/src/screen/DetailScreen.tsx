import { Button } from "@react-navigation/elements";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../type/type";


const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 200,
    }
})
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>
function DetailScreen({ route }: {route: DetailScreenRouteProp }): React.JSX.Element {
    const { itemId }: {itemId: number} = route.params
    console.log(itemId)
    const navigation = useNavigation()
    return (
        <ScrollView>
            <Image style={styles.img} source={{
                uri: "https://reactnative.cn/img/tiny_logo.png"
            }}></Image>
            <Text>DetailScreen</Text>
            <Image style={styles.img} source={require("../../assets/images/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image.jpg")}></Image>
            <Image style={styles.img} source={require("../img/image1.webp")}></Image>
            <Image style={styles.img} source={require("../img/hello.gif")}></Image>
            <Button onPressIn={() => {
                navigation.goBack()
            }}>返回</Button>
        </ScrollView>
    )
}

export default DetailScreen