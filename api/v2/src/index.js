const express = require("express");


const app = express();

const PORT = process.env.PORT || 8000;



app.get("/:table/?id=:id", (req, res) => {
    res.send(`table ${req.params.table} id ${req.params.id}`);
});



app.listen(PORT, () => {
    console.log("http://localhost:"+PORT);
});