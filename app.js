import express from "express";
import { writeFile } from "fs/promises";

const app = express();
const port = 3008;

//
app.get('/', (req, res) => {
    res.send('Happy Tuesday!')
})



// LEV 1

app.get("/status", (req, res) => {
    res.status(200).send("Ok");
});


// LEV 2

const posts = await fetch(
    `https://jsonplaceholder.typicode.com/posts`
);
const json = await posts.json();
// console.log(json);

app.get('/posts', (req, res) => {
    res.send(json)
})



// LEV 3

app.get("/posts/:id", async (req, res) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
        );
        const jsonData = await response.json();
        res.send(jsonData);

    } catch (error) {
        console.log("Ooooops!");
    }

})


//LEV 4 










app.listen(port, () => {
    console.log(`Hausnummer: ${port}`);
});