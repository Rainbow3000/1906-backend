const env = require('dotenv'); 
env.config(); 
const express = require('express'); 
const app = express(); 

const cors = require('cors');
app.use(cors()); 

const mongoose = require('mongoose'); 

const productRouter = require('./routers/productRouter'); 
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')
const commentRouter = require('./routers/commentRouter')
const orderRouter = require('./routers/orderRouter')

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db is connected !'))
.catch(err=>console.log(err))

app.use(express.json()); 

const PORT = process.env.PORT || 5000


app.use(productRouter); 
app.use(userRouter); 
app.use(orderRouter); 
app.use(authRouter); 
app.use(commentRouter); 



app.listen(PORT,()=>console.log(`server is runing at http://localhost:${PORT}`))

