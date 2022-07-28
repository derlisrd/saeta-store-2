const express = require("express");


const app = express();

const PORT = process.env.PORT || 8000;



app.get("/", (req, res) => {
    res.send("workings");
});



app.listen(PORT, () => {
    console.log("http://localhost:"+PORT);
});