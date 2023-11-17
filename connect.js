const mongoose = require("mongoose");

    //UserId: Team6
    //pass: 1234
    //db Name: TM-T6

const connectionString = 
"mongodb+srv://Team6:1234@cluster0.glhvt.mongodb.net/TM-T6?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose.connect(connectionString);
};

module.exports = connectDB;