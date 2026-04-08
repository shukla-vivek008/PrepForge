require("dotenv").config()

const app = require("./src/app.js");
const connectToDB = require("./src/config/connectToDB.js");


connectToDB();
const port = 3000;

app.listen(port, (req,res)=> {
    console.log(`Server is running on ${port}`);
});