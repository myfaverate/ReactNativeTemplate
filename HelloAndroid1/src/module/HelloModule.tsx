import { NativeModules } from "react-native"


const { HelloModule } = NativeModules
interface HelloInterface {
    getName(name: string): void
    getNameWithPromise(result: boolean): Promise<string>
    sendMap(data: string): Promise<boolean>
    sendRealMap(data: Record<string, string>): Promise<boolean>
}

export default HelloModule as HelloInterface