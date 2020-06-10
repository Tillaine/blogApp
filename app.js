const   express = require('express'),
        bodyparser = require('body-parser'),
        mongoose = require('mongoose'),
        app = express(),
        Port = 3000;

        // *****************************
        // Middleware
        // *****************************
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


        // *****************************
        // Database Connection
        // *****************************
        mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true, useUnifiedTopology: true });
        
        const connection = mongoose.connection;
        
        connection.once('open', function() {
          console.log('db connected!')
        });
        connection.on('error', console.error.bind(console, 'connection error:'));
        
        
        let blogModel = new mongoose.Schema({
            title: String,
            image: String,
            body: String,
            create: {type: Date, default: Date.now}
        });
        
        let Blog = mongoose.model('Blog', blogModel);
  // *****************************
     // Routes
  // *****************************     
app.get('/', (req, res) => {
    res.redirect("/blogs")
})

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) { console.log(err) }
        else {  
            res.render("index", {blogs})
         }

     })
})


app.listen(process.env.PORT || Port)


// Seed ***********
// Blog.create({
//     title: '#blacklivesmatter',
//     image: 'https://images.unsplash.com/photo-1591618695923-f36be0205618?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80',
//     body: 'Blog tumblr seitan viral, echo park gastropub semiotics PBR&B keytar tote bag affogato adaptogen cardigan cronut disrupt. Synth messenger bag cardigan cronut post-ironic raclette vaporware try-hard pickled lyft chia snackwave. Williamsburg craft beer cold-pressed fashion axe, waistcoat selvage chillwave iceland vegan. Viral brunch kombucha williamsburg banh mi selfies vaporware umami pickled sartorial raclette meh tattooed blue bottle bitters. Cred try-hard direct trade, ugh squid meggings put a bird on it taxidermy food truck vice godard biodiesel beard. Four loko wayfarers chicharrones jean shorts taiyaki before they sold out tattooed tousled, dreamcatcher man bun. Craft beer normcore vice kickstarter polaroid, asymmetrical typewriter cliche blog pickled taiyaki sustainable.',
// });