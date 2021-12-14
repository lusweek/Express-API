const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API");
const path = require("path");
// .config pekar på env filen
require("dotnev").config();

app.use(cors()); 

app.use(express.json());

// I app.js skriver vi http://localhost:5000/api/ - /api pekar på denna raden
app.use("/api", router)

// Detta sammankopplar app.js med vår API. Det jag skriver i app.js kommer ske på http://localhost:5000/ .
// Här letar static upp en fil som heter index i "client" mappen, 
// __dirname är som att skriva ../ man går alltså bakåt ett steg i mapparna
// man skriver __dirname i node. 
app.use(express.static(path.join(__dirname, "client")));

// Gjort en liten ändring på lösenordet
mongoose.connect(
process.env.MONGODB_URI, 
{useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true}, 
() => console.log("Conected to db")
);

// Instalerar: "npm install dotenv"
// dotenv används för säkerhet. Så inte vårt lösenord är tilljängligt
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

