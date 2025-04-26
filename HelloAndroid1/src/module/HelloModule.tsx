import { NativeModules } from "react-native"


const { HelloModule } = NativeModules
interface HelloInterface {
    getName(name: string): void
    getNameWithPromise(result: boolean): Promise<string>
}

export default HelloModule as HelloInterface