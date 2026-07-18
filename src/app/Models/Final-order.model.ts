import { ProductModel } from "./Product.model"

export interface FinalOrderModel {
    items: ProductModel[],
    address: AddressModel,
    cardDetails: CardDetails | null,
    paymentDetails: PaymentDetails,
    paymentMethod: string,
    shipment: ShipmentModel
}
export interface AddressModel{
    Postcode: string,
    address: string,
    place: string,
    title: string
}
export interface CardDetails{
    cardNumber: string,
    cardOwnerName: string,
    cvv: string,
    expireMonth: string,
    expireYear: string
}
export interface PaymentDetails{
    FinalTotalAmout: number,
    discount: number,
    shippigValue: number,
    tax: number,
    totalAmout: number
}
export interface ShipmentModel{
    data: string,
    id: number,
    price: string,
    type: string
}