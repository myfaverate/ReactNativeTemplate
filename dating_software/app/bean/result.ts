export interface Result<T>{
    code: number
    message: string
    data: T
}
export interface AuthCodeBean{
    code: string
}
export interface UserInfoBean{
    isNew: boolean
}

export interface Location {
  status: string
  regeocode: Regeocode
  info: string
  infocode: string
}

export interface Regeocode {
  addressComponent: AddressComponent
  formatted_address: string
}

export interface AddressComponent {
  city: any[]
  province: string
  adcode: string
  district: string
  towncode: string
  streetNumber: StreetNumber
  country: string
  township: string
  businessAreas: BusinessArea[]
  building: Building
  neighborhood: Neighborhood
  citycode: string
}

export interface StreetNumber {
  number: string
  location: string
  direction: string
  distance: string
  street: string
}

export interface BusinessArea {
  location: string
  name: string
  id: string
}

export interface Building {
  name: any[]
  type: any[]
}

export interface Neighborhood {
  name: string
  type: string
}
