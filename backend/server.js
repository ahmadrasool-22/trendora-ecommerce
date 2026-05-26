const dotenv = require("dotenv");
dotenv.config(); // 👈 MUST BE FIRST

require("./config/cloudinary");

const connectDB = require("./config/db");
const app = require("./app");

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});