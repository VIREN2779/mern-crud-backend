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


module.exports = {
  createPost
};
