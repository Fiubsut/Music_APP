const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://buithanhtu2506:112233zZ%40@capp.crpln.mongodb.net/Music_App", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    });
    console.log('Kết nối thành công tới MongoDB');
  } catch (error) {
    console.error('Kết nối MongoDB thất bại:', error);
    process.exit(1); // Thoát chương trình nếu kết nối thất bại
  }
};

module.exports = connectDB;