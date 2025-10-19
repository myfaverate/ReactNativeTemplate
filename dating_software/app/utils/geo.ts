import * as Device from 'expo-device';
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { Geolocation, init } from "react-native-amap-geolocation";
import { Location } from '../bean/result';

// 将代码包裹在 async 函数中

class AMapLocationService {

    private static instance: AMapLocationService

    private constructor() { }

    public static getInstance(): AMapLocationService {
        if (!AMapLocationService.instance) {
            AMapLocationService.instance = new AMapLocationService();
        }
        return AMapLocationService.instance;
    }

    private isInit: boolean = false

    public async getCityLocation(): Promise<string> {
        await this.initLocation()
        Geolocation.getCurrentPosition(({ coords }) => {
            console.log(`coords: ${JSON.stringify(coords)}`);
            const latitude: number = coords.latitude
            const longitude: number = coords.longitude
            // 高德逆地理编码API URL
            const apiKey: string = "70d0039e87e9965e166801a00812a501"; // 替换为你的实际Key
            const url: string = `https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${apiKey}`;
            fetch(url, {
                method: "get",
            }).then(response => {
                response.json().then((result: Location) => {
                    console.log(`${Platform.OS} ${Device.modelName} result: ${JSON.stringify(result)}`)
                    return Promise.resolve(result.regeocode.formatted_address)
                }).catch((error: Error) => {
                    console.log(`${Platform.OS} ${Device.modelName} error1: ${JSON.stringify(error)}`)
                })
            }).catch((error: Error) => {
                console.log(`${Platform.OS} ${Device.modelName} error2: ${JSON.stringify(error)}`)
            })
        }, (error) => {
            console.error("获取位置失败:", error);
        });
        return Promise.resolve("error")
    }


    public async getCityLocation1(): Promise<Location> {
        await this.initLocation()
        const coords = await new Promise<{
            latitude: number;
            longitude: number;
        }>((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => resolve(coords),
                (error) => reject(error),
            );
        });
        // 2. 拼接 URL
        console.log(`${Platform.OS} ${Device.modelName} getCityLocation1 coords: ${JSON.stringify(coords)}`)
        const { latitude, longitude } = coords;
        const apiKey: string = "70d0039e87e9965e166801a00812a501";
        const url: string = `https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${apiKey}`;

        // 3. 获取地址
        const response = await fetch(url);
        const result: Location = await response.json();

        if (result.status === "1" && result.regeocode) {
            console.log(`${Platform.OS} ${Device.modelName} success getCityLocation1 result:  ${JSON.stringify(result)}`)
            return result
        } else {
            throw new Error(`高德 API 错误: ${result.info}`);
        }
    }

    private async initLocation() {
        if(!Device.isDevice){
            Alert.alert("暂时不支持模拟器")
            return
        }
        if (this.isInit) {
            console.log(`已经初始化过了...`)
            return
        }
        console.log(`正在初始化...`)
        try {
            // 请求定位权限
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ]);

            // 检查权限是否被授予
            if (
                granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED &&
                granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log("定位权限已授予");

                // 初始化高德定位SDK
                try {
                    await init({
                        ios: "7e4a8ffeb467903d363c68eb8f8f475b",
                        android: "c0fc7dc685fd815ad880d8c60a51f227",
                    });
                    this.isInit = true
                } catch (error) {
                    console.error(`${Platform.OS} ${Device.modelName} init发生错误:`, error);
                }


                // 获取当前位置
                Geolocation.getCurrentPosition(({ coords }) => {
                    console.log(`coords: ${JSON.stringify(coords)}`);
                }, (error) => {
                    console.error("获取位置失败:", error);
                });

            } else {
                console.log("定位权限被拒绝");
            }
        } catch (err) {
            console.error(`${Platform.OS} ${Device.modelName} 发生错误:`, err);
        }
    }

}

export default AMapLocationService.getInstance()

// 调用函数
console.log(`高德地图sdk 初始化...`)