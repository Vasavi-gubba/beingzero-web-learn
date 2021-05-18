const mongoose =require("mongoose")
const schema = mongoose.Schema

const Tableschema = new schema({
    name:{
        type:String,
         required: true
    },
    Articels:{
        type:String,
        required: true
    }
})

const Table= mongoose.model('Table',Tableschema)
module.exports=Table