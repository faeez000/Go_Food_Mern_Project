const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://faaizshaikh586:faeez1999@cluster0.glodnw9.mongodb.net/goFoodMern?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) {
        console.log("---", err);
      } else {
        console.log("connected");

        const fetchedData = await mongoose.connection.db.collection(
          "food_items"
        );

        fetchedData.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "food_category"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) {
              console.log(err);
            } else {
              global.food_items = data;
              global.food_Category = catData;
              // console.log(global.food_items);
            }
          });

          // if (err) {
          //   console.log(err);
          // } else {
          //   global.food_items = data;
          //   // console.log(global.food_items);
          // }
        });
      }
    }
  );
};
mongoose.set("strictQuery", true);

module.exports = mongoDB;
