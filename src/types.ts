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