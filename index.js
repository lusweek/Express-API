const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API")

app.use(cors()); 

app.use(express.json());

app.use("/api", router)

// Gjort en liten ändring 
mongoose.connect(
"mongodb+srv://Lukas-i-Bastun:HejDig6@my-fisrt-api.kwwwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true}, 
() => console.log("Conected to db")
);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

