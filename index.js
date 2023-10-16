const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

const categories = [
    "Animals",
    "Clothes",
    "Sports",
    "Colors",
    "Family",
    "Food",
    "Human",
    "House",
    "Technology",
    "Materials",
    "Business",
];

app.get("/api", async (req, res) => {

    const { category } = req.query;

    //error
    if (!categories.includes(category)) return res.json({ error: "Нет такой категории" });

    let randomRows = null;

    try {
        randomRows = await db.query("select * from words where category = $1 order by random() limit 30", [ category ]);
    } catch (e) {
        console.log(e);
    }

    randomRows = randomRows.rows;
    let randomWord = randomRows[Math.floor(Math.random() * randomRows.length)];
    let randomWordText = randomWord.translation;
    randomWordText = randomWordText.replaceAll("\n", "");

    res.json({ ...randomWord, translation: randomWordText });

});

app.listen(PORT, () => console.log("server started"));

module.exports = app;
