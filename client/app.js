// API root 
// I index.js skriver vi // app.use("/api", router) // Så sammankopplar vi dessa
const rootURL = "/api/" ; 


let posts = [] ;

//responce message
// message argumentet har vi för att kunna skicka vidare något till en annan funktion
const showresponsemessage = (message) => {
    document.querySelector("#response-message").innerHTML = message; 
    setTimeout(() => {
    document.querySelector("#response-message").innerHTML = ""; 
    }, 2000)
};

//get posts - vanlig fetch för att hämta data 
const getPosts = async () => {
    const res = await fetch(`${rootURL}getposts`);
    const data = await res.json();
    posts = data.posts; 
    document.querySelector("#posts").innerHTML = posts
    .map(
        //quid - id:t i varje objekt i mappen har en quid id, detta är mass siffror. Behöver 
        //  hantera det, inte så svårt. Man skriver _id, det är mongodb. 
        // vi lägger in id i varje objekt vi mappar ut för att kunna targeta dem när vi ska uppdatera 
        //      och för att kunna ta bort dem, som vi vill i funktionen deletePost.
        post => 
        `<div>
            <h3 id="'${post._id}'-title">${post.title}</h3>
            <p id="'${post._id}'-content">${post.content}</p>
                <input id="update-post-'${post._id}'-title" placeholder="Title">
                <input id="update-post-'${post._id}'-content" placeholder="Content">
            <button onclick="updatePost('${post._id}')">Update</button>
            <button onclick="deletePost('${post._id}')">Delete</button>

        </div>`
        ).join("")

}
 
// New post
const newPost = async () => {
    // .value blir det man skriver i boxarna i html. 
    const firstname = document.querySelector("#post-firstname").value;
    const email = document.querySelector("#post-email").value;
    const title = document.querySelector("#post-title").value;
    const content = document.querySelector("#post-content").value;
    
    // Varför behöver man skriva detta? 
    const post = {
        firstname: firstname,
        email: email,
        title: title,
        content: content
        /*Man kan skriva
        title,
        content
        När det är exakt samma ord. 
         */
    };

    const res = await fetch(`${rootURL}newpost`, {
        // Detta spesar vad vi ska göra, method kan vara get, delete, post, update
        method: "post",
        //När vi skickar förväntar sig databasen och api att datan ska vara i JSON, därför gör vi om det till JSON
        // Den kräver spesifikt JSON.stringefy - det är det som är översättningen.
        //app.use(express.json) - som ligger i index.js förväntar sig ochså att det ska vara i JSON. 
        body: JSON.stringify(post),
        headers: {
            // Spesar vad för data vi skickar - att det komemer vara JSON. Brosern får också veta vad för typ av 
            // data som vi skickar. Att vi skriver detta är ett minimum. 
            "Content-type": "application/json"
        },
    });
    const data = await res.json(); 
    // Consol logga data här och se vad du får
    getPosts()
    showresponsemessage(data.message.mgsBody)

    document.querySelector("#post-title").value = "" ; 
    document.querySelector("#post-content").value = "" ; 

};
//update post
const updatePost = async (id) => {
// Consollogga här för att se om id:t förljer med ner hit. 
// getElementById är stabilare att använda för att hämta variabeldata
const title = document.getElementById(`update-post-'${id}'-title`).value;
const content = document.getElementById(`update-post-'${id}'-content`).value;

const post = {
    // OM title är truethy, allats om det är en sträng med något i, sätter vi värdet till title,
    // annats är det falsy
    title: title ? title : document.getElementById(`'${id}'-title`).innerHTML,
    content: content 
    ? content : document.getElementById(`'${id}'-content`).innerHTML,
};

const res = await fetch(`${rootURL}updatepost`, {
    method: "put",
    body: JSON.stringify(post),
    headers: {
        "Content-Type": "application/json"
    }
});
const data = await res.json()
getPosts()
showresponsemessage(data.message.mgsBody)

}

//delete post
// argumentet id hämtas från getPosts, det säger vilken post man ska ta bort 
// findByIdaAndDelete används här. Därför behöver vi objektets id. 
const deletePost = async (id) => {
    const res = await fetch(`${rootURL}deletepost/${id}`, {
        method: "delete"
    })
    const data = await res.json();
    getPosts(); 
    showresponsemessage(data.message.mgsBody);
};


window.addEventListener("load", getPosts())