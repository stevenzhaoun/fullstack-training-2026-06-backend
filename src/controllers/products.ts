import {Request, Response} from 'express'
import { prisma } from '../prismaClient'

export const listProducts = async (req: Request, res: Response) => {

    console.log('req.query', req.query)

    const products = await prisma.product.findMany({
        where: {
            price: {
                gte: Number(req.query.minPrice) || undefined,
                lte: Number(req.query.maxPrice) || undefined,
            }
        }
    })

    return res.json(products)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await prisma.product.findUnique({
        where: { id: Number(id) }
    })

    if(!product) {
        return res.status(404).json({ error: 'Product not found' })
    }

    return res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
    const { title, description, price } = req.body
    const product = await prisma.product.create({
        data: { title, description, price }
    })

    return res.json(product)
}