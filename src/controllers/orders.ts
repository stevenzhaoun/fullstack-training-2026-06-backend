import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const listOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        include: {
            products: {
                select: {
                    id: true,
                }
            },
        }
    })
    return res.json(orders)
}

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            products: true
        }
    })
    if(!order) {
        return res.status(404).json({ error: 'Order not found' })
    }
    return res.json(order)
}

export const createOrder = async (req: Request, res: Response) => {
    const { email, name, productIds, totalPrice } = req.body as { email: string, name: string, productIds: number[], totalPrice: number }
    try {

        const order = await prisma.order.create({
            data: {
                email,
                name,
                products: {
                    connect: productIds.map(productId => ({ id: productId }))
                },
                totalPrice,
            }
        })
        return res.json(order)
    } catch(e) {
        console.error(e)
        return res.status(500).json({ error: 'Failed to create order' })
    }

}