const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API")
const path = require("path")

app.use(cors()); 

app.use(express.json());

// I app.js skriver vi http://localhost:5000/api/ - /api pekar på denna raden
app.use("/api", router)

// Detta sammankopplar app.js med vår API. Det jag skriver i app.js kommer ske på http://localhost:5000/ .
app.use(express.static(path.join(__dirname, "client")));

// Gjort en liten ändring 
mongoose.connect(
"mongodb+srv://Lukas-i-Bastun:HejDig6@my-fisrt-api.kwwwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true}, 
() => console.log("Conected to db")
);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

