const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const dbURI = 'mongodb+srv://root:60618495Ro%21@ronnen-test.md2vp.mongodb.net/ronnen-test?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    console.log('connected to db')
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error)
  })
// express app
const app = express();

// listen for requests
app.use(express.static('public'))
app.use(morgan('dev'))

// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new title2',
//     snippet: 'bla bla bla',
//     body: 'blablalblalasdasdnjasdjnasdjnjasd'
//   });
//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((error) =>{
//       console.log(error)
//     })
// })

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch(error => console.log(error))
// })


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', {title: 'all Blogs', blogs: result})
    })
    .catch(error => console.log(error))
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
