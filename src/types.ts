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