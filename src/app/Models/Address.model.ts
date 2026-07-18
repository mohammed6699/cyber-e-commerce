export interface AddressModel {
    title: string,
    address: string,
    Postcode: string,
    place: string
}
export interface ShipmentModel{
    method:{
        id: number,
        date: string,
        price: string,
        type: string
    }
}
export interface CartPaymentDetails{
    FinalTotalAmout: number,
    discount: number,
    tax: number,
    shippigValue: number,
    totalAmout: number
}