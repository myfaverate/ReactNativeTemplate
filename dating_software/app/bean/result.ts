export interface Result<T>{
    code: number
    message: string
    data: T
}
export interface AuthCodeBean{
    code: string
}