const express = require("express");
const http = require("http"); 
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var app = express()
http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/BookShop"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/BookShop", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('db connected...');
        })
        .catch(() => {
            console.log('bad connection...');
        });

var descriptionBook = mongoose.model("descriptionbooks", new Schema({
    description: String,
    tags: [ String ]
}));

app.get("/descriptionbooks", async (req, res) => {
    await descriptionBook.find()
                .then(async (descriptionBooks) => {
					res.json(descriptionBooks);
				})
				.catch((err) => {
					console.log(err);
				});
});

app.post("/descriptionbooks", async (req, res) => {
	console.log(req.body);
	let newdescriptionBook = new descriptionBook({
        "description": req.body.description, 
        "tags": req.body.tags
    });
	
	await newdescriptionBook.save()
                   .then(async (result) => {
                       await descriptionBook.find()
                           .then(async (result) => {
                               res.json(result);
                           })
                           .catch(async (err) => {
                               res.send(err);
                           });
                   })
                   .catch(async (err) => {
                       console.log(err);
                       res.send("ERROR");
                   });
});