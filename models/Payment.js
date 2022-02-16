const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PaymentSchema = new mongoose.Schema({
    parent:{
        type:Schema.Types.ObjectId,
        ref : "Parent"
    },
    children:{
        type:Schema.Types.ObjectId,
        ref : "Children"
    },
    month:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = Payment = mongoose.model('Payment',PaymentSchema);