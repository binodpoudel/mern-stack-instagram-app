const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = 5000;
const {MONGODB} = require('./config/keys')


mongoose.connect(MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("MongoDB connection")
})
mongoose.connection.on('error',(err)=>{
    console.log("MongoDB error connection",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("Express server is running on",PORT)
})

