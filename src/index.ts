import express from "express";
import bodyParser from 'body-parser';
import rolesRouter from './routes/roles';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import { authentication } from './middlewares/authentication';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

const app = express();


app.use(bodyParser.json())
app.use(authRouter)

app.use(authentication)

app.use(rolesRouter)
app.use(userRouter)
app.use(productsRouter)
app.use(ordersRouter)


app.get('/', (req, res) => {
    console.log('Request received on root path');
    res.send('Hello World on root');
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});