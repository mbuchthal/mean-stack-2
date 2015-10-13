'use strict'

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Blog = require("./models/blog");

// Connect to the database with error check
mongoose.connect("mongodb://localhost/blog", function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

// Create the Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Use the body-parser package in our application
app.use(bodyParser.json());

// Register the router with the application
app.use(express.static(__dirname + "/public"));

// READ
// Create endpoint /api/blogs for POST

app.post("/api/blogs", function (req, res) {

// blogsRoute.post(function (req, res) {
  // New instance of the Blog model
  var blog = new Blog();

  // Set the blog properties that came from the Post data
  blog.title = req.body.title;
  blog.content = req.body.content;
  blog.author = req.body.author;
  blog.date = req.body.date;
  blog.comments = req.body.comments;

  // Save the blog and check for errors
  blog.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json(blog);
  });
});

// Create endpoint for /api/blogs for GET
app.get("/api/blogs", function (req, res) {
  Blog.find(function (err, blogs) {
    if (err) {
      res.send(err);
    }
    res.json(blogs);
  });
});

// Create

// Create a new route for /blogs/:blog_id
app.get("/api/blogs/:blog_id", function (req, res) {

  // Find a specific blog
  Blog.findById(req.params.blog_id, function (err, blog) {
    if (err) {
      res.send(err);
    }
    res.json(blog);
  });
});

// Update

// Change the blog
app.put("/api/blogs/:blogs_id", function (req, res) {
  // Use the Blog model to find a specific blog
  Blog.findById(req.params.blogs_id, function (err, blog) {
    if (err) {
      res.send(err);
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.author = req.body.author;
    blog.date = req.body.date;
    blog.comments = req.body.comments;

    // Save the blog and check for errors
    blog.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json(blog);
    });
  });
});

// Delete

// Create endpoint /api/blogs/:blod_id for Delete
app.delete("/api/blogs/:blog_id", function (req, res) {
  Blog.findByIdAndRemove(req.params.blog_id, function (err) {
    if (err) {
      res.send(err)
    }
    res.json({ message: "Successfully removed blog." });
  });
});

// Load the index file
app.get('*', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port);
console.log('server listening at port:' + port);
