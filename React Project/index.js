require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection=require("./db")
const userRoutes= require("./routes/users")
const authRoutes= require("./routes/auth")


//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


const port = process.env.PORT || 3000;
console.log(port);
const uriMongo=process.env.URI_MONGO
console.log(uriMongo);
connection(uriMongo);

app.listen(port, ()=>{
    console.log('listening on PORT')
});