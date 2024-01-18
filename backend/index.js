const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


const port = 8080;
app.listen(port, () => console.log("Listening on port ", port));
app.get("/", (req, res) => {
    res.send("Welcome to Eric's Rest Assignment");
});
app.get("/guest", (req, res) => {
    const player = (x.find((player) => (player.username === "guest")))
    res.send(player)
})
app.post("/updateboard", (req, res) => {
    const player = (x.find((player) => (player.username === req.body.username)))
    player.board = req.body.board
    res.send('updated!')
})

let x = [{
    username: "guest",

    board: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
}, {
    username: "Daniel",
    password: "Khaitov",
    board: [[4, null, null, 8], [2, 2, null, null], [null, null, null, null], [null, null, null, null]]
}]

let passwords = {
    stuff: 'pw',
    nextName: 'pw2'
}
// app.get("/:username", (req, res) => {
//     res.send()
// })

app.post("/login", (req, res) => {
    const player = (x.find((player) => (player.username === req.body.username) && (player.password === req.body.password)))
    if (player) {
        res.send(player)
    }
    else {
        res.send(false)
    }

})
app.get("/items", (req, res) => {
    res.send(x);
});

app.post("/items", (req, res) => {
    for (const item of Object.keys(req.body)) {
        x[item] = req.body[item]
    }

    res.send(x);
});


