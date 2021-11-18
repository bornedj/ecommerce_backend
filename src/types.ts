import { Request } from 'express';

//allows for product to be added in request params
export interface GetProductByID extends Request {
    product?: {
        id: number, 
        name: string,
        price: number,
        description: string
    }
}

export interface GetUserByID extends Request {
    user?: {
        id: number,
        firstName: string,
        lastName: string,
        password: string,
        email: string
    }
}

export interface GetCartByID extends Request {
    cart?: {
        id: number,
        created: Date,
        modified: Date
    }
}

export interface GetCartItemByID extends Request {
    cartItem?: {
        created: Date,
        modified: Date,
        productID: number,
        cartID: number,
        id: number
    }
}

export interface CreateOrderRequest extends Request {
    body: {
      userID: number,
      total: number,
      status: string
    }
}

export interface GetOrderByID extends Request {
    order?: {
        id: number,
        userID: number,
        total: number,
        status: string,
        created: Date,
        modified: Date | null
    }
}

export interface UpdateOrderRequest extends Request {
    order?: {
        id: number
    }

    body: {
        status: string,
        total: number
    }
}

export interface CreateOrderItemRequest extends Request {
    body: {
        quantity: number,
        price: number,
        orderID: number,
        productID: number
    }
}

export interface GetOrderItemByID extends Request {
    orderItem?: {
        quantity: number,
        created: Date,
        modified: Date,
        price: number,
        orderID: number,
        productID: number,
        id: number
    }
}

export type ProductID  = {
    product_id: number 
}

export interface CheckoutRequest extends GetCartByID {
    body: {
        userID: number
    }
}

export type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    created: Date,
    modified?: Date,
    quantity?: number
}