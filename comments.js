// create web server with express
const express = require('express');
const app = express();
// get mongoose
const mongoose = require('mongoose');
// get body-parser
const bodyParser = require('body-parser');
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/comments');
// create schema
const CommentSchema = mongoose.Schema({
    name: String,
    comment: String,
    created_at: Date
});
// create model
const Comment = mongoose.model('Comment', CommentSchema);
// use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// use ejs
app.set('view engine', 'ejs');
// set static files
app.use(express.static('public'));
// set routes
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) throw err;
        res.render('index', { comments: comments });
    });
});
app.post('/comments', (req, res) => {
    Comment.create({
        name: req.body.name,
        comment: req.body.comment,
        created_at: new Date()
    }, (err, comment) => {
        if (err) throw err;
        res.redirect('/');
    });
});
// start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});