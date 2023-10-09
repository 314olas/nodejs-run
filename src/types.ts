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

export interface Order {
    id: number,
    userId: number,
    cartId: number,
    items: CartItem[],
    totalPrice: number,
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