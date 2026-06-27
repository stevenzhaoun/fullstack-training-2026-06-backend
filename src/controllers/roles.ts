import {Request, Response} from 'express'
import { prisma } from '../prismaClient';

export const createRole = async (req: Request, res: Response) => {
    console.log('create role')
    try {
        const role = await prisma.role.create({
            data: {
                name: req.body.name,
                permissions: {
                    connect: req.body.permissions.map((permission: string) => ({name: permission})),
                }
            }
        })
        res.status(201).json(role)
    } catch (error) {
        console.error('Error creating role:', error)
        if((error as any).code === 'P2002') {
            res.status(400). json({ error: 'Role already exists' })
        } else {
            res.status(400). json({ error: 'Failed to create role' })
        }
    }
}

export const listRoles = async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true,
        }
    })
    console.log(roles)
    res.status(200).json(roles)
}