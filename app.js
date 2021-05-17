const express = require("express");
const app = express();      // Initiate express app
const path = require("path");
const port = 80;        // Default port



// Access template file -> views dir
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Render file
app.get("/demo", (req, res)=> {
    res.status(200).render('template', { title: 'Express App', message: 'This is an Express app made using Nodejs and Express module',
credit: 'Developed By Syed Shehroz Ali' })
});

// Start server
app.listen(port, ()=> {
    console.log(`Server Running at port ${port}`)
});