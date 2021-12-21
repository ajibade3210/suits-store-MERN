const express= require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://localhost/suit-store",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('DB connected')
})
.catch((err=>{
    console.log(err.message)
}))

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: {
            type: String,
             default: shortid.generate
            },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: Array,
    })
    );

app.get("/api/products", async (req, res)=>{
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res)=> {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res)=>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct, "");
})


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log("Server Connected"));