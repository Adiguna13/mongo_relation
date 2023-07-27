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
  username: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweet = async () => {
  const user = await User.findOne({
    username: "John Doe",
  });
  const tweet = new Tweet({
    text: "Hello Joe 2",
    likes: 0,
  });
  tweet.user = user;
  tweet.save();
};

// makeTweet();

const showTweet = async () => {
  const tweets = await Tweet.findById("64c22274bb97a998783d800f").populate(
    "user"
  );
  console.log(tweets);
};

showTweet();
