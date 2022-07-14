const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.MONGO_CONN,()=>{
    console.log("conectado ")
})