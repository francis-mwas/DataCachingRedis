const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

const redisUrl = 'redis://127.0.0.1:6379';

const client = redis.createClient();
client.on('connect', () => console.log('Connected to Redis!'));
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

module.exports = (app) => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    // client.get = util.promisify(client.get);
    const cachedBlogs = await client.get(req.user.id);
    // console.log('cached blogs: ', cachedBlogs);
    if (cachedBlogs) {
      console.log('SERVING FROM CACHE');
      return res.send(JSON.parse(cachedBlogs));
    }
    const blogs = await Blog.find({ _user: req.user.id });
    console.log('SERVING FROM MONGODB');
    res.send(blogs);

    client.set(req.user.id, JSON.stringify(blogs));
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
