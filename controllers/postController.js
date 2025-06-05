const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      date: req.body.date,
      image: req.file.filename,
    });
    const postData = await post.save();

    res.status(200).json({
      success: true,
      message: 'Post Successfully',
      data: postData,
    });
  } catch (error) {
    console.log('create Post catch error(postController.js)', error.message);
    res.status(404).json({
      success: false,
      message: 'create Post catch error(postController.js)',
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send({
      success: true,
      message: ' Post all Data(postController.js)',
      data: posts,
    });
  } catch (error) {
    console.log('get catch error(postController.js)', error.message);
    res.status(400).json({
      success: false,
      message: 'get catch error(postController.js)',
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'delete data successfully(postController.js)',
    });
  } catch (error) {
    console.log('delete catch error(postController.js)', error.message);
    res.status(400).json({
      success: false,
      message: 'delete catch error(postController.js)',
    });
  }
};


module.exports = {
  createPost,
  getPosts,
  deletePost
};
