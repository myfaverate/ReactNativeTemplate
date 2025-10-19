import { NativeModules } from "react-native"
 
 
const { HelloModule } = NativeModules
interface HelloInterface {
    requestPermission(): Promise<string>
}
 
export default HelloModule as HelloInterface