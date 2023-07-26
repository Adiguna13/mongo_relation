const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relation_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["spring", "summer", "fall", "winter"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      enum: ["spring", "summer", "fall", "winter"],
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

const makeFarm = async () => {
  const farm = new Farm({
    name: "Farm 1",
    city: "Atlanta",
  });
  const melon = await Product.findOne({ name: "melon" });
  farm.products.push(melon);
  await farm.save();
  console.log(farm);
};

// makeFarm();

const addProduct = async (id) => {
  const farm = await Farm.findById(id);
  const Watermelon = await Product.findOne({ name: "watermelon" });
  farm.products.push(Watermelon);
  await farm.save();
  console.log(farm);
};

addProduct("64c07d638c8cfc90440cac05");

// Product.insertMany([
//   {
//     name: "melon",
//     price: 8,
//     season: "spring",
//   },
//   {
//     name: "watermelon",
//     price: 9,
//     season: "summer",
//   },
//   {
//     name: "apple",
//     price: 8,
//     season: "fall",
//   },
// ]);
