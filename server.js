const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/article');
const methodOverride = require('method-override');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0/blog');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });    
});

app.use('/articles', articleRouter);

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening to port ${port}...`));

