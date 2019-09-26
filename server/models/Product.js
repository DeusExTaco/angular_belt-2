let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Products must contain a Name"],
        minlength: [3, "Product name must be at least 3 characters long"]
    },
    quantity: {
        type: Number,
        required: [true, "Product must contain a Quantity"]
    },
    price: {
        type: Number,
        required: [true, "Product must contain a Price"]
    },
}, {timestamps: true});

// make the model
mongoose.model('Product', productSchema);