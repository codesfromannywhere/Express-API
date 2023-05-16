import express from "express";
import { log } from "node:console";
import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

const app = express();
const port = 3005;

//
app.get('/', (req, res) => {
    res.send('Happy Tuesday!')
})



// LEV 1

app.get("/status", (req, res) => {
    res.status(200).send("Ok");
});


// LEV 2

// const posts = await fetch(
//     `https://jsonplaceholder.typicode.com/posts`
// );
// const json = await posts.json();
// // console.log(json);

// app.get('/posts', (req, res) => {
//     res.send(json)
// })



// LEV 3

// app.get("/posts/:id", async (req, res) => {
//     try {
//         const response = await fetch(
//             `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
//         );
//         const jsonData = await response.json();
//         res.send(jsonData);

//     } catch (error) {
//         console.log("Ops, I did it again!");
//     }

// })


//LEV 4 POSTS

app.get('/posts', async (req, res) => {

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts`
        );
        const newPostData = await response.json();
        await writeFile('posts.json', JSON.stringify(newPostData, null, 2));

        const postList = await readFile('posts.json', 'utf-8');
        const newPostList = JSON.parse(postList)
        // console.log(newPostList);

        res.send(newPostList);


    } catch (error) {
        console.log("Ops, I did it again!");
    }

})



//LEV 4 POSTS UND ID

app.get('/posts/:id', async (req, res) => {

    try {
        const postsData = await readFile('posts.json', 'utf-8');
        const postsParse = await JSON.parse(postsData)
        const found = postsParse.find((elt) => {
            return elt.id === Number(req.params.id)
        })
        res.send(found);

    } catch (error) {
        console.log("Ops, I did it again!");
    }

})

app.listen(port, () => {
    console.log(`Hausnummer: ${port}`);
});

