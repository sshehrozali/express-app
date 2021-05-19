const express = require("express");
const app = express();      // Initiate express app
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const port = 80;        // Default port




// Starting mongodb
mongoose.connect('mongodb://localhost/sampleData', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB is connected...");
});

// Creating schema
const formSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
  });

// Creating Model
const data = mongoose.model("data", formSchema);







// Serving static HTML file (index.html)
app.get("/", (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, 'static/index.html'));
});




// Express app config
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.post("/registeredSuccessfully", (req, res) => {

    const renderEngineObj = {
        "message": `Welcome, ${req.body.fullName}`,
        "status": "You are registered!"
    };

    // Save User's Fullname, Email and Password in MongoDB
    const IndividualUserData = new data({ fullname: `${req.body.fullName}`, email: `${req.body.email}`, password: `${req.body.password}` });
    IndividualUserData.save()
    
    res.status(200).render("template", renderEngineObj);
    console.log(req.body.fullName, req.body.email, req.body.password);
})






// Start server
app.listen(port, ()=> {
    console.log(`Server Running at port ${port}`)
});