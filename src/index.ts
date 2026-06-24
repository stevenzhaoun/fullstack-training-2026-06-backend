import express from "express";
import { prisma } from './prismaClient';

const app = express();

app.get('/', (req, res) => {
    console.log('Request received on root path');
    res.send('Hello World on root');
})

app.get('/roles', async (req, res) => {

    const roles = await prisma.role.findMany({
        include: {
            permissions: true,
        }
    })
    console.log(roles)
    res.status(200).json(roles)
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});