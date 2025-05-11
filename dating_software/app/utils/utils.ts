import { FA5Style } from "@expo/vector-icons/build/FontAwesome5"
import { Dimensions } from "react-native"

class Utils {
    public width: number = Dimensions.get("screen").width
    public height: number = Dimensions.get("screen").height
    pxToUnit(px: number): number {
        return this.width * px / 375
    }
    /**
     * 校验手机号，国内
     * @param phone 手机号
     * @returns 是否匹配
     */
    isValidatePhone(phone: string): boolean {
        const regex: RegExp = /^1[3-9]\d{9}$/
        return regex.test(phone)
    }
}

export default new Utils()