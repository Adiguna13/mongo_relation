const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relation_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  addresses: [
    {
      _id: false, //menambahkan _id: false supaya addresses tidak memiliki id
      street: String,
      city: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// const makeUser = async () => {
//   const user = new User({
//     name: "John Dough",
//   });
//   user.addresses.push({
//     street: "123 Baker Street",
//     city: "London",
//     country: "UK",
//   });
//   const res = await user.save();
//   console.log(res);
// };

// makeUser();

// const addAddress = async (id) => {
//   const user = await User.findById(id);
//   user.addresses.push({
//     street: "123 Baker Street",
//     city: "London",
//     country: "UK",
//   });
//   const res = await user.save();
//   console.log(res);
// };

// addAddress("64bf555d5eeef1bc7163cda2");
