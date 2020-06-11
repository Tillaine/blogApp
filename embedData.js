const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blog_demo', { useNewUrlParser: true, useUnifiedTopology: true });
        
const connection = mongoose.connection;
        
connection.once('open', function() {
    console.log('db connected!')
});
connection.on('error', console.error.bind(console, 'connection error:'));

const postSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Post = mongoose.model("Post", postSchema);


const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})

const User = mongoose.model("User", userSchema);


// newUser = new User({
//     email: "Kimberly Jones",
//     name: 'Kim@justice.org'
// })

// newUser.posts.push({
//     title: '400 years',
//     content:"you are lucky we want equality and not revenge"
// });

// newUser.save((err, user) => {
//     if(err) {console.log(err)}
//     else {console.log(user)}
// })

// newPost = new Post({
//     title: 'BLM',
//     content: 'end qualified immunity'
// })

// newPost.save((err, post) => {
//     if(err) {console.log(err)}
//     else {console.log(post)}
// })

User.findOne({name: 'Kim@justice.org'}, (err, user) => {
    if(err) {console.log(err)}
    else {
        user.posts.push({
            title: 'BLM',
            content: 'end qualified immunity'
        });
        user.save((err, user) => {
            if(err) {console.log(err)}
            else {console.log(user)}
        })
    }
})