export interface Product {
    id: number,
    title: string,
    description: string,
    price: number
}

export interface CartItem {
    product: Product,
    count: number
}

// export interface Order {
//     id: string,
//     userId: string,
//     cartId: string,
//     items: CartItem[],
//     payment: {type: string, address: string, creditCard: string},
//     delivery: {type: string, address: string},
//     comments: string,
//     status: string,
//     totalPrice: number
// }

// export interface CartResponse {
//     data: {order: Order, totalPrice: number},
//     error?: ErrorResponse
// }

// export interface ProductResponse {
//     data: Product,
//     error?: ErrorResponse
// }

// export interface ProductsResponse {
//     data: Product[],
//     error?: ErrorResponse
// }

// export interface EmptySuccessResponse {
//     data: {success: boolean},
//     error?: ErrorResponse
// }

// export interface ErrorResponse {
//     message: string
// }


export interface Order {
    id: number,
    userId: number,
    cartId: number,
    items: CartItem[],
    totalprice: number,
    status: 'successed' | 'created'
}

export interface Cart {
    id: number,
    userId: number,
    status: 'deleted' | 'created',
    items: CartItem[]
}

export interface User {
    id: number
}