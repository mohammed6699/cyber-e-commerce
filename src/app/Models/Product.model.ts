export interface ProductListModel {
    products: ProductModel[]
}
// product details here
export interface ProductModel{
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: string[]
    brand: string,
    sku: string,
    weight: number,
    dimensions: DimensionsModel,
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    reviews: ReviewsModel[],
    returnPolicy: string,
    minimumOrderQuantity: number,
    meta: MetaModel,
    images: string[],
    thumbnail: string,
    // add prop to manage teh quantity
    quantity?: number,
}
export interface DimensionsModel {
    width: number,
    height: number,
    depth: number
}
export interface ReviewsModel{
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}
export interface MetaModel{
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
}
export interface SearchProducts{
    products: ProductModel[],
    total: number,
    skip: number,
    limit: number
}