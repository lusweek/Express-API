// HEMMA PLUGG - slutade titta 11:20. började kl 08:40 = ca 3 tim 20 min 

// nodemailer behöver nodemailer-sendgrid för att fungera 
// nodemailer behövs för att kommunicera med api:et.
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

// transport - håller en metod som vi plockar från nodemailer som sätter upp
// conectionen till vår sendgrid. 
// Metod som sätter upp conectionen till sendgrid.

// Detta vi skriver kan vi använda för att kunna skicka mail.
const transport = nodemailer.createTransport(
    // detta behövs för att kunna komunisera
    nodemailerSendgrid({
        // objektet innegåller api nyckeln vi skapade på SendGrid hemsidan
        // efter att man skapat ett konto och sendgrej där
        // 
        apiKey: process.env.SENDGRID_KEY,
    })
);
// Vi kan skapa så många funktioner som hällst för att skicka olika typer av mail
// Nu skapar vi bara en variant

// En funktion som använder 'transport' för att skicka spesifika typer av email.
// alltså sådanna emails vi vill skicka. 

// Denna funktion nämns i API.js för att ta en emailadress
// Parametern 'post' innehåller den mail någon har skrivit in.
// sendMail är en funktion som skickar mail genom sendGrid. 
const postAddedEmail = (post) => {
transport.sendMail({
    // 'Lukas' som det står nedan är det som står på mailet innan
    // användaren öppnar mailet.  
    from: "Lukas <lusweek@gmail.com>",
    // 'to' innehåller vem mailen ska skickas till. 
    to: `${post.firstname} <${post.email}>`,
    // subjekt och html är det som användaren får i sitt mail. 
    subject: "Message recived",
    // i 'text' skriver man en sträng som milsystemet använder om inte mailsystemet kan läsa
    //      html, används bara om hmtl inte kan läsas. 
    text: "text till användaren" ,
    html: `<h1>Your message has been recived</h1>
            <p>Hi ${post.firstname}, your message ${post.title} has been receved.</p>
            <p>We will get back to you soon</p>
            <p>\n Have a great day!</p>
            `
    // tar ett argument, är en promice, därför använder vi .then och .catch
}).then(() => console.log("Email sent"))
.catch((err) => console.log(err))
};


// vi vill kunna skicka flera olika mail, därför använder vi inte modele.exports
// utan istället som redanstående. Då kan vi välja att skicka olika slags mail.
exports.postAddedEmail = postAddedEmail; 
